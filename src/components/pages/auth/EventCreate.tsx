import React, { FC } from "react";

import { EventCreateEditForm } from "../../organisms/event/EventCreateEditForm";

export const EventCreate: FC = () => {
  return (
    <>
      <EventCreateEditForm method={"post"} />
    </>
  );
};
