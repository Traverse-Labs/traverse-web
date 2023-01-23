import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { CREATE_USER_QUERY_KEY } from "../constants";
import { User } from "../types/User.type";
import { createNewUser } from "./User.api";

export const useCreateUserMutation = (
  onSuccess?: (data: User) => void
): UseMutationResult<User> => {
  return useMutation({
    mutationKey: [CREATE_USER_QUERY_KEY],
    mutationFn: (user: User) => createNewUser(user),
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
  });
};
