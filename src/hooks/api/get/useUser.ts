import { useCallback, useState } from "react";
import axios from "axios";

import { User } from "../../../types/api/User";
import { useUserInfoContext } from "../../../context/UserInfoContext";

// 自分の情報を取得しコンテキストにセット

export const useUser = () => {
  const { setUserInfo, setIsUserChecked } = useUserInfoContext();

  const [userTempInfo, setUserTempInfo] = useState<User>();

  const getUser = useCallback((user_id: string) => {
    (async () => {
      try {
        const res_user = await axios.get<User>(
          "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/users?userid=" +
            user_id
        );
        setUserInfo(res_user.data);
        setUserTempInfo(res_user.data);
        console.log(res_user.data);

        //ユーザのチェックが完了したらtrueに
        setIsUserChecked(true);
      } catch (error) {
        console.log("ユーザーが取得できません");
      }
    })();
  }, []);
  return { getUser, userTempInfo };
};
