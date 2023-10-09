import { httpClient } from "../http-client";

export const getUserInfo = async () => {
  const response = await httpClient.request({
    resourceIdentifier: "/user",
    requestMethod: "GET",
  });

  return response.data;
};

export const signIn = async ({ identifier, password }) => {
  const response = await httpClient.request({
    resourceIdentifier: "/sign-in",
    requestMethod: "POST",
    data: {
      identifier,
      password,
    },
  });

  return response.data;
};

export const signUp = async ({ identifier, password }) => {
  const response = await httpClient.request({
    resourceIdentifier: "/sign-up",
    requestMethod: "POST",
    data: {
      identifier,
      password,
    },
  });

  return response.data;
};
