import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as appsync from "aws-cdk-lib/aws-appsync";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as path from "path";

interface LambdasProps {
  api: appsync.GraphqlApi;
  table: dynamodb.Table;
  userPool: cognito.UserPool;
  userPoolClient: cognito.UserPoolClient;
}

export class Lambdas extends Construct {
  constructor(scope: Construct, id: string, props: LambdasProps) {
    super(scope, id);

    // --- Users Service Lambda ---
    const usersLambda = new NodejsFunction(this, "UsersServiceLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "handler",
      entry: path.join(
        __dirname,
        "../../../lambdas/users-service/src/handlers/index.ts"
      ),
      bundling: {
        externalModules: ["@aws-sdk/client-cognito-identity-provider"],
        // FIX: This tells the CDK to build the function without using Docker.
        forceDockerBundling: false,
      },
      environment: {
        USER_POOL_ID: props.userPool.userPoolId,
        USER_POOL_CLIENT_ID: props.userPoolClient.userPoolClientId,
      },
    });
    props.userPool.grant(usersLambda, "cognito-idp:AdminCreateUser");

    // --- Transactions Service Lambda ---
    const transactionsLambda = new NodejsFunction(
      this,
      "TransactionsServiceLambda",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "handler",
        entry: path.join(
          __dirname,
          "../../../lambdas/transactions-service/src/handlers/index.ts"
        ),
        bundling: {
          externalModules: [
            "@aws-sdk/client-dynamodb",
            "@aws-sdk/lib-dynamodb",
          ],
        },
        environment: {
          TABLE_NAME: props.table.tableName,
        },
      }
    );
    props.table.grantReadWriteData(transactionsLambda);

    // --- Connect Lambdas to AppSync as Data Sources ---
    const usersDataSource = props.api.addLambdaDataSource(
      "UsersLambdaDataSource",
      usersLambda
    );
    const transactionsDataSource = props.api.addLambdaDataSource(
      "TransactionsLambdaDataSource",
      transactionsLambda
    );

    // --- Create Resolvers ---
    usersDataSource.createResolver("registerUserResolver", {
      typeName: "Mutation",
      fieldName: "registerUser",
    });
    usersDataSource.createResolver("loginResolver", {
      typeName: "Mutation",
      fieldName: "login",
    });

    transactionsDataSource.createResolver("listTransactionsResolver", {
      typeName: "Query",
      fieldName: "listTransactions",
    });
    transactionsDataSource.createResolver("createTransactionResolver", {
      typeName: "Mutation",
      fieldName: "createTransaction",
    });
  }
}
