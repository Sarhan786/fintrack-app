import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';

// Define the structure of the input we expect from our AppSync `registerUser` mutation
interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

// Define the structure of the event that AppSync sends to our Lambda
interface AppSyncEvent {
  arguments: {
    input: RegisterUserInput;
  };
}

// Initialize the Cognito client. It will automatically use the permissions
// granted to the Lambda function by our CDK code.
const cognitoClient = new CognitoIdentityProviderClient({});

export const handler = async (event: AppSyncEvent) => {
  console.log('Lambda invoked with event:', event);

  // Extract the user details from the AppSync event object
  const { name, email, password } = event.arguments.input;
  const { USER_POOL_ID } = process.env;

  // Check if the required environment variable is set
  if (!USER_POOL_ID) {
    console.error('Error: USER_POOL_ID environment variable is not set.');
    throw new Error('Server configuration error.');
  }

  // Prepare the parameters for the AdminCreateUserCommand
  const params: AdminCreateUserCommandInput = {
    UserPoolId: USER_POOL_ID,
    Username: email, // We use the email as the username for simplicity
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'given_name',
        Value: name,
      },
      {
        Name: 'email_verified', // We auto-verify the email since the user is signing up
        Value: 'true',
      },
    ],
    TemporaryPassword: password, // Cognito will require the user to change this on first login
    MessageAction: 'SUPPRESS', // Don't send the default welcome email from Cognito
  };

  try {
    // Send the command to Cognito to create the user
    const command = new AdminCreateUserCommand(params);
    const response = await cognitoClient.send(command);

    console.log('Successfully created user in Cognito:', response.User);

    // If user creation is successful, return the user's details
    if (response.User) {
      return {
        id: response.User.Username,
        name: name,
        email: email,
      };
    } else {
      throw new Error('User creation did not return a user object.');
    }
  } catch (error) {
    console.error('Error creating user in Cognito:', error);
    // This will automatically be converted into a GraphQL error by AppSync
    throw new Error(`Failed to create user: ${(error as Error).message}`);
  }
};