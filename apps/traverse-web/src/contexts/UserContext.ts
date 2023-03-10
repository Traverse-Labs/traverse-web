import { isEmpty } from "lodash";
import { createContext, useContext } from "react";

type UserContextType = {
  userId: string;
  programAddress: string;
  email: string;
  projectName: string;
  defaultDashboard: number;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context || isEmpty(context)) {
    throw new Error(
      `useUserContext must be used within a UserContext.Provider`
    );
  }

  return context;
};
