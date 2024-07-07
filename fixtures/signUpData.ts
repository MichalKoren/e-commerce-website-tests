import { faker } from "@faker-js/faker";
import { UserCredentials } from "../support/types";

export const correctUser: UserCredentials = {
  username: faker.internet.userName({
    firstName: "John",
    lastName: "Doe",
  }),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const invalidEmail: UserCredentials = {
  username: faker.internet.userName({ firstName: "John", lastName: "Doe" }),
  email: "johndoetest.com",
  password: faker.internet.password(),
};

export const existingEmail: UserCredentials = {
  username: faker.internet.userName({ firstName: "John", lastName: "Doe" }),
  email: "test@test.com", // already exist in our DB
  password: faker.internet.password(),
};

export const invalidPassword: UserCredentials = {
  username: faker.internet.userName({ firstName: "John", lastName: "Doe" }),
  email: faker.internet.email(),
  password: "123",
};

export const existingUserName: UserCredentials = {
  username: "TestUserName", // username already exist in our DB
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const invalidUserName: UserCredentials = {
  username: "",
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const createdUser: UserCredentials = {
  username: "testUser",
  email: "test@test.com",
  password: "test123",
};
