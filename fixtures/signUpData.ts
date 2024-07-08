import { faker } from "@faker-js/faker";
import { UserCredentials } from "../support/types";

// User data for testing with valid credentials
export const correctUser: UserCredentials = {
  username: faker.internet.userName({
    firstName: "John",
    lastName: "Doe",
  }),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

// User data for testing with an invalid email format
export const invalidEmail: UserCredentials = {
  username: faker.internet.userName({ firstName: "John", lastName: "Doe" }),
  email: "johndoetest.com",
  password: faker.internet.password(),
};

// User data for testing with an existing email in the database
export const existingEmail: UserCredentials = {
  username: faker.internet.userName({ firstName: "John", lastName: "Doe" }),
  email: "test@test.com", // email already exist in our DB
  password: faker.internet.password(),
};

// User data for testing with an invalid password (too short)
export const invalidPassword: UserCredentials = {
  username: faker.internet.userName({ firstName: "John", lastName: "Doe" }),
  email: faker.internet.email(),
  password: "123",
};

// User data for testing with an existing username in the database
export const existingUserName: UserCredentials = {
  username: "TestUserName", // username already exist in our DB
  email: faker.internet.email(),
  password: faker.internet.password(),
};

// User data for testing with an invalid username (empty string)
export const invalidUserName: UserCredentials = {
  username: "",
  email: faker.internet.email(),
  password: faker.internet.password(),
};

// User data for a created user with specific credentials
export const createdUser: UserCredentials = {
  username: "testUser",
  email: "test@test.com",
  password: "test123",
};
