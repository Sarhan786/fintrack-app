import dotenv from 'dotenv';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { RegisterUserInput } from '../types/user.types';

dotenv.config();
const cognitoClient = new CognitoIdentityProviderClient({});
const { USER_POOL_ID } = process.env;

export const registerUserInCognito = async (input: RegisterUserInput) => {
  const { name, email, password } = input;

  if (!USER_POOL_ID) {
    console.error('Error: USER_POOL_ID environment variable is not set.');
    throw new Error('Server configuration error.');
  }

  const params: AdminCreateUserCommandInput = {
    UserPoolId: USER_POOL_ID,
    Username: email,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'given_name', Value: name },
      { Name: 'email_verified', Value: 'true' },
    ],
    TemporaryPassword: password,
    MessageAction: 'SUPPRESS',
  };

  try {
    const command = new AdminCreateUserCommand(params);
    const response = await cognitoClient.send(command);
    console.log('Successfully created user in Cognito:', response.User);

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
    throw new Error(`Failed to create user: ${(error as Error).message}`);
  }
};