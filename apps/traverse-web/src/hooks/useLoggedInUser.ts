import { ApiClient } from "api-client";
import { NextRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { getUser } from "../api/User.api";
import { USER_ID_LS_KEY } from "../constants";
import { User } from "../types/User.type";

export const useLoggedInUser = (router: NextRouter) => {
  const userRef = useRef<string>();
  const [user, setUser] = useState<User>({});

  if (typeof window !== "undefined") {
    userRef.current = localStorage.getItem(USER_ID_LS_KEY) as string;
  }

  useEffect(() => {
    const userId = userRef.current;

    if (userId) {
      ApiClient.defaults.headers["x-user-id"] = userId;
      getUser(userId).then((userInfo) => {
        setUser(userInfo);
      });
    }
  }, [router]);

  return user;
};
