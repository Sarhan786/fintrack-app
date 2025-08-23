const {
  VITE_USER_POOL_ID,
  VITE_USER_POOL_CLIENT_ID,
  VITE_GRAPHQL_API_URL,
  VITE_AWS_REGION,
} = import.meta.env;

export const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: VITE_USER_POOL_ID, // e.g., 'ap-south-1_xxxxxxxxx'
      userPoolClientId: VITE_USER_POOL_CLIENT_ID, // e.g., 'xxxxxxxxxxxxxxxx'
    },
  },
  API: {
    GraphQL: {
      endpoint: VITE_GRAPHQL_API_URL, // e.g., 'https://xxxxxxxx.appsync-api.ap-south-1.amazonaws.com/graphql'
      region: VITE_AWS_REGION, // Or your AWS region
      defaultAuthMode: "userPool",
    },
  },
};
