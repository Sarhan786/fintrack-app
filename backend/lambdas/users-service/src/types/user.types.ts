export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface AppSyncEvent {
  arguments: {
    input: RegisterUserInput;
  };
}