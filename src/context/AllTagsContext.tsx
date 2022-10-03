import React from "react";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Tag } from "../types/api/Tag";

// typeの宣言
export type AllTagsContextType = {
  allTags: Tag[];
  setAllTags: Dispatch<SetStateAction<Tag[]>>;
};

const AllTagsContext = createContext({} as AllTagsContextType);

export function useAllTagsContext() {
  return useContext(AllTagsContext);
}

export function AllTagsProvider(props: { children: ReactNode }) {
  const { children } = props;

  const [allTags, setAllTags] = useState<Tag[]>([]);

  return (
    <AllTagsContext.Provider value={{ allTags, setAllTags }}>
      {children}
    </AllTagsContext.Provider>
  );
}
