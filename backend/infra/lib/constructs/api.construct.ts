import { Construct } from "constructs";
import * as appsync from "aws-cdk-lib/aws-appsync";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as path from "path";

interface ApiProps {
  userPool: cognito.UserPool;
}

export class Api extends Construct {
  public readonly graphqlApi: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id);

    this.graphqlApi = new appsync.GraphqlApi(this, "FintrackGraphQLApi", {
      name: "fintrack-graphql-api",
      definition: appsync.Definition.fromSchema(
        appsync.SchemaFile.fromAsset(path.join(__dirname, "../schema.graphql"))
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userPool,
          },
        },
      },
    });
  }
}
