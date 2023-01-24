import { ApiClient } from "api-client";
import { NextRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { getUser } from "../api/User.api";
import { USER_ID_LS_KEY } from "../constants";
import { User } from "../types/User.type";

export const useLoggedInUser = (router: NextRouter) => {
  const userRef = useRef<string>();
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem(USER_ID_LS_KEY) as string;

      userRef.current = userId;

      if (userId) {
        ApiClient.defaults.headers["x-user-id"] = userId;
        router.push(`/${userId}`);
      } else {
        router.push(`/`);
      }
    }
  }, []);

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
