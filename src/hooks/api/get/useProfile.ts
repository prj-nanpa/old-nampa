import { useCallback, useState } from "react";
import axios from "axios";

import { User } from "../../../types/api/User";

// 他のユーザーの情報を取得

export const useOthers = () => {
  const [othersInfo, setOthersInfo] = useState<User>();

  const getOthers = useCallback((user_id: string) => {
    const mydataurl =
      "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/users?userid=" +
      user_id;
    (async () => {
      try {
        const res_user = await axios.get<User>(mydataurl);
        setOthersInfo(res_user.data);
      } catch (error) {
        console.log("ユーザーが取得できません");
      }
    })();
  }, []);
  return { getOthers, othersInfo };
};
