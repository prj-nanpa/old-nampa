import React from "react";

import { Comment } from "../../organisms/comment/Comment";
import { LinkToEventSearch } from "../../organisms/home/LinkToEventSearch";
import { EventDetail } from "../../organisms/event/EventDetail";
import { useLocation } from "react-router-dom";

type State = {
  event_id: number;
};

export const Event = () => {
  // stateから情報を取得
  const location = useLocation();
  const state = location.state as State;

  return (
    <>
      <EventDetail event_id={state?.event_id} />
      <Comment event_id={state?.event_id} />
      <LinkToEventSearch />
    </>
  );
};
