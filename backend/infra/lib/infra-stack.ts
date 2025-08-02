import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // --- 1. AWS Cognito User Pool ---
    // This service will store and manage all our user accounts securely.
    const userPool = new cognito.UserPool(this, 'FinTrackUserPool', {
      userPoolName: 'fintrack-user-pool',
      selfSignUpEnabled: true, // Allow users to sign up themselves
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
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Deletes the pool if the stack is deleted
    });

    // --- 2. Cognito User Pool Client ---
    // This is the "app" that our frontend will use to interact with the User Pool.
    const userPoolClient = new cognito.UserPoolClient(this, 'FinTrackUserPoolClient', {
      userPool,
    });


    // --- 3. AWS AppSync GraphQL API ---
    // This is our main API endpoint. AppSync is a managed GraphQL service.
    const api = new appsync.GraphqlApi(this, 'FinTrackGraphQLApi', {
      name: 'fintrack-graphql-api',
      schema: appsync.Schema.fromAsset(path.join(__dirname, 'schema.graphql')),
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
    // This is our first microservice. It will handle user-related business logic.
    const usersLambda = new lambda.Function(this, 'UsersServiceLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler', // Assumes the handler function is exported from index.js
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../services/users-service/dist')),
      environment: {
        USER_POOL_ID: userPool.userPoolId,
        USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
      }
    });

    // Grant the Lambda function permission to interact with our Cognito User Pool
    userPool.grant(usersLambda, 'cognito-idp:AdminCreateUser', 'cognito-idp:AdminInitiateAuth');

    // --- 5. Connect Lambda to AppSync API ---
    // Set the Lambda function as a data source for the API.
    const lambdaDataSource = api.addLambdaDataSource('UsersLambdaDataSource', usersLambda);

    // Create resolvers to connect our GraphQL schema mutations to the Lambda data source.
    // When a `registerUser` mutation is received, AppSync will invoke our `usersLambda`.
    lambdaDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'registerUser',
    });
    
    // We will add the login resolver later, as login can often be handled directly
    // by the frontend with Cognito, but the resolver is here for completeness.
    lambdaDataSource.createResolver({
        typeName: 'Mutation',
        fieldName: 'login',
    });

    // --- 6. Stack Outputs ---
    // Print the necessary IDs and endpoints to the terminal after deployment.
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