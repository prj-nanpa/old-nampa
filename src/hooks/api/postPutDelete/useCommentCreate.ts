import axios from "axios";

import { CommentPost } from "../../../types/react-hook-form/CommentPost";

export const useCommentCreate = () => {
  const url =
    "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/comments";
  const commentCreate = async (obj: CommentPost) => {
    try {
      await axios.post(url, obj);
      console.log("新規コメントを作成しました");
    } catch {
      console.log("新規コメントの作成に失敗しました");
    }
  };
  return { commentCreate };
};
