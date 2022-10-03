import React, { FC } from "react";
import { useLocation } from "react-router-dom";

import { Event } from "../../../types/api/Event";

import { EventCreateEditForm } from "../../organisms/event/EventCreateEditForm";

type State = {
  event: Event;
};

export const EventEdit: FC = () => {
  const location = useLocation();
  const state = location.state as State;
  const { event } = state;

  console.log(event);

  return (
    <>
      <EventCreateEditForm event={event} method={"put"} />
    </>
  );
};
