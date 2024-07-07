export enum SignUpMessages {
  invalidUserName = "user name must be alphanumeric only and between 5 and 64 characters!",
  existingUserName = "This user name is not available. Try different login name!",
  invalidEmail = "Email Address does not appear to be valid!",
  existingEmail = "EMail Address is already registered!",
  invalidPassword = "Password must be between 4 and 20 characters!",
  successfulMessage = "YOUR ACCOUNT HAS BEEN CREATED!",
}

export type UserCredentials = {
  username: string;
  email: string;
  password: string;
};
