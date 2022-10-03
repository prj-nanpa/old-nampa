import React from "react";
import { SearchCardLists } from "../events/SearchCardLists";
import { Event } from "../../../types/api/Event";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";

type Props = {
  events: Event[] | undefined;
  genreData?: SearchEventList;
};

export const EventSearchResult = (props: Props) => {
  const { events } = props;

  return (
    <>
      <SearchCardLists
        events={events}
        eventListTitle="検索結果"
      ></SearchCardLists>
    </>
  );
};
