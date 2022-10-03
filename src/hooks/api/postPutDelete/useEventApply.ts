import axios from "axios";

export type EventApplyInfo = {
  event_id?: number | null;
  user_id?: string | null;
};

export const useEventApply = () => {
  const url =
    "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/events_join";
  const eventApply = async (method: string, obj: EventApplyInfo) => {
    if (method === "post") {
      try {
        await axios.post(url, obj);
        console.log(obj, "参加登録を行いました");
      } catch {
        console.log("参加登録に失敗しました");
      }
    } else if (method === "delete") {
      try {
        await axios.delete(url, { data: obj });
        console.log(obj, "参加登録が解除されました");
      } catch {
        console.log("参加登録の解除に失敗しました");
      }
    }
  };
  return { eventApply };
};
