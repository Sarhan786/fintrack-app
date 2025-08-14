import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // --- 1. AWS Cognito User Pool ---
    const userPool = new cognito.UserPool(this, 'FintrackUserPool', {
      userPoolName: 'fintrack-user-pool',
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: false,
        },
        givenName: {
            required: true,
            mutable: true,
        }
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // --- 2. Cognito User Pool Client ---
    const userPoolClient = new cognito.UserPoolClient(this, 'FintrackUserPoolClient', {
      userPool,
    });


    // --- 3. AWS AppSync GraphQL API ---
    const api = new appsync.GraphqlApi(this, 'FintrackGraphQLApi', {
      name: 'fintrack-graphql-api',
      definition: appsync.Definition.fromSchema(
        appsync.SchemaFile.fromAsset(path.join(__dirname, 'schema.graphql'))
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
    });

    // --- 4. `users-service` Lambda Function ---
    const usersLambda = new NodejsFunction(this, 'UsersServiceLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../../services/users-service/src/index.ts'),
      
      bundling: {
        externalModules: ['@aws-sdk/client-cognito-identity-provider'],
        // FIX: This tells the CDK to build the function without using Docker.
        forceDockerBundling: false,
      },
      
      environment: {
        USER_POOL_ID: userPool.userPoolId,
        USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
      }
    });

    // --- Grant the Lambda function permission to interact with the Cognito User Pool ---
    userPool.grant(usersLambda, 'cognito-idp:AdminCreateUser');

    // --- 5. Connect Lambda to AppSync API ---
    const lambdaDataSource = api.addLambdaDataSource('UsersLambdaDataSource', usersLambda);

    lambdaDataSource.createResolver('registerUserResolver', {
      typeName: 'Mutation',
      fieldName: 'registerUser',
    });
    
    lambdaDataSource.createResolver('loginResolver', {
        typeName: 'Mutation',
        fieldName: 'login',
    });

    // --- 6. Stack Outputs ---
    new cdk.CfnOutput(this, 'GraphQLApiUrl', {
        value: api.graphqlUrl
    });
    new cdk.CfnOutput(this, 'UserPoolId', {
        value: userPool.userPoolId
    });
    new cdk.CfnOutput(this, 'UserPoolClientId', {
        value: userPoolClient.userPoolClientId
    });
  }
}
