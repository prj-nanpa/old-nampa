import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginUserContext } from "../context/LoginUserContext";
import { useUserInfoContext } from "../context/UserInfoContext";
import { useUser } from "../hooks/api/get/useUser";
import { useLoginUser } from "../hooks/useAuth";
import { useAllTags } from "../hooks/api/get/useAllTags";

type Props = {
  component: React.ReactNode;
  redirect: string;
};

export const AuthRoute = (props: Props) => {
  const { component, redirect } = props;

  const NavigateComponent = () => {
    return (
      <>
        <Navigate
          to={redirect}
          state={{ from: useLocation() }}
          replace={false}
        />
      </>
    );
  };

  // ログインユーザー・全タグのセット
  const { getLoginUser } = useLoginUser();
  const { getUser } = useUser();
  const { getAllTags } = useAllTags();

  const { loginUser, isAuthChecked } = useLoginUserContext();

  const { isUserChecked, userInfo } = useUserInfoContext();

  useEffect(() => {
    getLoginUser();
    getAllTags();

    // ログインができていたらユーザ情報を取得
    if (isAuthChecked && loginUser && !userInfo.user_id) {
      getUser(loginUser.user_id);
    }
  }, [isAuthChecked]);

  if (!isAuthChecked)
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400/20 flex justify-center items-center">
        <div className="animate-spin h-20 w-20 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  if (loginUser === null) {
    // firebaseログインができていない場合
    return <NavigateComponent />;
  } else {
    // firebaseログインができている場合
    if (!isUserChecked)
      return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400/20 flex justify-center items-center">
          <div className="animate-spin h-20 w-20 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      );
    if (loginUser.user_id === null) {
      // DBが存在しない場合
      return <NavigateComponent />;
    } else {
      return <>{component}</>;
    }
  }
};
