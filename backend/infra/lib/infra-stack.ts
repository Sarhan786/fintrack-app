import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

// Note: We now import from 'aws-cdk-lib' and 'constructs', not '@aws-cdk/core'.

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
        requireSymbols: false, // Set to false for simplicity during development
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
      schema: appsync.SchemaFile.fromAsset(path.join(__dirname, 'schema.graphql')),
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
    // Placeholder code for now. We will add real code in the next step.
    const usersLambda = new lambda.Function(this, 'UsersServiceLambda', {
      runtime: lambda.Runtime.NODEJS_18_X, // This is now correct with CDK v2
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../services/users-service/src')), // Pointing to src for now
      environment: {
        USER_POOL_ID: userPool.userPoolId,
        USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
      }
    });

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
