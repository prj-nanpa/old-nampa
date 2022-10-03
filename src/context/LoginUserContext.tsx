import React from "react";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { LoginUser } from "../types/firebase/LoginUser";

// typeの宣言
export type LoginUserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
  isAuthChecked: boolean;
  setIsAuthChecked: Dispatch<SetStateAction<boolean>>;
};

const LoginUserContext = createContext({} as LoginUserContextType);

export function useLoginUserContext() {
  return useContext(LoginUserContext);
}

export function LoginUserProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  return (
    <LoginUserContext.Provider
      value={{ loginUser, setLoginUser, isAuthChecked, setIsAuthChecked }}
    >
      {children}
    </LoginUserContext.Provider>
  );
}
