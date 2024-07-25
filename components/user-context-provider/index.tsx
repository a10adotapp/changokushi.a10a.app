"use client"

import { ReactNode, createContext, useContext } from "react";

export type UserContext = {
  hasSignedIn: boolean;
  likeCount: number;
};

export const UserContext = createContext<UserContext>({
  hasSignedIn: false,
  likeCount: 0,
});

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({
  children,
  defaultValue,
}: {
  children: ReactNode;
  defaultValue: UserContext;
}) {
  return (
    <UserContext.Provider value={defaultValue}>
      {children}
    </UserContext.Provider>
  );
}
