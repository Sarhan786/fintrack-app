export const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: 'YOUR_USER_POOL_ID', // e.g., 'ap-south-1_xxxxxxxxx'
      userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID', // e.g., 'xxxxxxxxxxxxxxxx'
    }
  },
  API: {
    GraphQL: {
      endpoint: 'YOUR_GRAPHQL_API_URL', // e.g., 'https://xxxxxxxx.appsync-api.ap-south-1.amazonaws.com/graphql'
      region: 'ap-south-1', // Or your AWS region
      defaultAuthMode: 'userPool',
    }
  }
};