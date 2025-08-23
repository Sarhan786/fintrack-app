import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Database, Auth, Api, Lambdas } from "./constructs";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Instantiate our custom constructs
    const database = new Database(this, "Database");
    const auth = new Auth(this, "Auth");
    const api = new Api(this, "Api", { userPool: auth.userPool });
    new Lambdas(this, "Lambdas", {
      api: api.graphqlApi,
      table: database.table,
      userPool: auth.userPool,
      userPoolClient: auth.userPoolClient,
    });

    // --- Stack Outputs ---
    new cdk.CfnOutput(this, "GraphQLApiUrl", {
      value: api.graphqlApi.graphqlUrl,
    });
    new cdk.CfnOutput(this, "UserPoolId", { value: auth.userPool.userPoolId });
    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: auth.userPoolClient.userPoolClientId,
    });
  }
}
