import axios from "axios";
import { EventFormList } from "../../../components/organisms/event/EventCreateEditForm";
import { EventDeleteFormID } from "../../../components/organisms/event/EventDetail";

export const useEventCreateEditDelete = () => {
  const url = "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/events";
  const eventCreateEditDelete = async (
    method: string,
    obj: EventFormList | EventDeleteFormID
  ) => {
    console.log("data", obj);

    if (method === "post") {
      try {
        await axios.post(url, obj);
        console.log(obj, "イベント新規作成 成功");
      } catch {
        console.log("イベント新規作成エラー");
      }
    } else if (method === "put") {
      try {
        await axios.put(url, obj);
        console.log(obj, "イベント編集 成功");
      } catch {
        console.log("イベント編集エラー");
      }
    } else if (method === "delete") {
      try {
        await axios.delete(url, { data: obj });
        console.log(obj, "イベント削除 成功");
      } catch {
        console.log("イベント削除エラー");
      }
    } else {
      console.log("正しいmethod(put/post/delete)を引数に入れてください");
    }
  };
  return { eventCreateEditDelete };
};
