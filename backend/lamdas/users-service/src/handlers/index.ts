import { AppSyncEvent } from '../types/user.types';
import { registerUserInCognito } from '../services/auth.service';

export const handler = async (event: AppSyncEvent) => {
  console.log('Lambda invoked with event:', event);
  
  // The handler now simply calls our business logic service.
  // This makes the code cleaner and easier to test.
  return registerUserInCognito(event.arguments.input);
};