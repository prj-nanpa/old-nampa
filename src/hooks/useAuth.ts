import { useState } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  // getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import { useUserCreateEdit } from "./api/postPutDelete/useUserCreateEdit";
import { useLoginUserContext } from "../context/LoginUserContext";
import { useUserInfoContext } from "../context/UserInfoContext";
import { useUser } from "./api/get/useUser";

const fireauth = firebaseApp.fireauth;

export type UserFormCreate = {
  user_id: string;
  user_name: string;
  user_icon: string;
  user_email: string;
};

//googleログイン用hook
export const useLoginWithGoogle = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // ログインユーザのコンテキスト
  const { loginUser } = useLoginUserContext();
  // ユーザ情報取得判別用
  const { isUserChecked, userInfo } = useUserInfoContext();

  // ユーザー作成apihooks
  const { userCreateEdit } = useUserCreateEdit();
  //ユーザー取得api hooks
  const { getUser } = useUser();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "sios.com",
    });
    try {
      setError(false);

      const res = await signInWithPopup(fireauth, provider);

      if (isUserChecked && userInfo.user_id) {
        console.log("ユーザDBがある場合");
        setSuccess(true);
        navigate("/");
      } else {
        console.log("ユーザDBがない場合(初回ログイン)");
        const userRegister: UserFormCreate = {
          user_email: res.user.email ?? "",
          user_name: res.user.displayName ?? "",
          user_icon: res.user.photoURL ?? "",
          user_id: res.user.uid,
        };
        console.log("初回ログイン登録情報", userRegister);
        await userCreateEdit("post", userRegister);
        if (loginUser) getUser(loginUser.user_id);
        navigate("/welcome");
      }
    } catch {
      console.log("ログインに失敗しました");
      setError(true);
    }
  };
  return { success, error, loginWithGoogle };
};

// ログアウト用hook
export const useLogout = () => {
  const logout = async () => {
    try {
      await signOut(fireauth);
      console.log("Sign-out successful.");
    } catch {
      console.log("ログアウトに失敗しました");
    }
  };

  return { logout };
};

// ログインユーザー取得hooks
export const useLoginUser = () => {
  const { setLoginUser, setIsAuthChecked } = useLoginUserContext();

  const getLoginUser = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (loginUser) => {
      if (loginUser) {
        const loginUserInfo = {
          user_email: loginUser.email,
          user_name: loginUser.displayName,
          user_icon: loginUser.photoURL,
          user_id: loginUser.uid,
        };
        setLoginUser(loginUserInfo);
      }
      setIsAuthChecked(true);
    });
  };

  return { getLoginUser };
};
