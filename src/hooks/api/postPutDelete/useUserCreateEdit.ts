import axios from "axios";
import { UserFormEdit } from "../../../components/pages/auth/MyPageEdit";
import { UserFormCreate } from "../../useAuth";

export const useUserCreateEdit = () => {
  const url = "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/users";
  const userCreateEdit = async (
    method: string,
    obj: UserFormCreate | UserFormEdit
  ) => {
    if (method === "post") {
      try {
        await axios.post(url, obj);
        console.log("新規ユーザーを作成しました");
      } catch {
        console.log("新規ユーザーの作成に失敗しました");
      }
    } else if (method === "put") {
      try {
        await axios.put(url, obj);
        console.log("ユーザーの情報を編集しました");
      } catch {
        console.log("ユーザーの情報編集に失敗しました");
      }
    }
  };
  return { userCreateEdit };
};
