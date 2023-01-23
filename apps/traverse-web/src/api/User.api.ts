import { ApiClient } from "api-client";

import { User } from "../types/User.type";

// Create new user
export const createNewUser = async (user: User) => {
  const response = await ApiClient.post(`/api/user`, user);

  return response.data as User;
};

// Get user info
export const getUser = async (userId: string) => {
  const response = await ApiClient.get(`/api/user/me`, {
    headers: {
      "x-user-id": userId,
    },
  });

  return response.data as User;
};
