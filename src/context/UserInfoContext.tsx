import React from "react";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "../types/api/User";

// typeの宣言
export type UserInfoContextType = {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
  isUserChecked: boolean;
  setIsUserChecked: Dispatch<SetStateAction<boolean>>;
};

const UserInfoContext = createContext({} as UserInfoContextType);

export function useUserInfoContext() {
  return useContext(UserInfoContext);
}

export function UserInfoProvider(props: { children: ReactNode }) {
  const { children } = props;

  const [userInfo, setUserInfo] = useState<User>({});
  const [isUserChecked, setIsUserChecked] = useState<boolean>(false);

  return (
    <UserInfoContext.Provider
      value={{ userInfo, setUserInfo, isUserChecked, setIsUserChecked }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
