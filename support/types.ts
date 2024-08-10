// Enum for various sign-up related messages that might be shown to the user
export enum SignUpMessages {
  invalidUserName = "user name must be alphanumeric only and between 5 and 64 characters!",
  existingUserName = "This user name is not available. Try different login name!",
  invalidEmail = "Email Address does not appear to be valid!",
  existingEmail = "EMail Address is already registered!",
  invalidPassword = "Password must be between 4 and 20 characters!",
  successfulMessage = "YOUR ACCOUNT HAS BEEN CREATED!",
}
// Type definition for user credentials used during sign-up and login
export type UserCredentials = {
  username: string;
  email: string;
  password: string;
};
