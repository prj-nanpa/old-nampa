import { useCallback } from "react";
import axios from "axios";

import { Tag } from "../../../types/api/Tag";
import { useAllTagsContext } from "../../../context/AllTagsContext";

type TagApi = {
  tags: Tag[];
};

export const useAllTags = () => {
  const { setAllTags } = useAllTagsContext();
  const tagsurl =
    "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/tags";

  const getAllTags = useCallback(() => {
    (async () => {
      try {
        const res_tags = await axios.get<TagApi>(tagsurl);
        setAllTags(res_tags.data.tags);
      } catch (error) {
        console.log("タグが取得できません", error);
      }
    })();
  }, []);
  return { getAllTags };
};
