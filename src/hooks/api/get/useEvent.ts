import { useCallback, useState } from "react";
import axios from "axios";

import { Event } from "../../../types/api/Event";

export const useEvent = () => {
  const [event, setEvent] = useState<Event>();

  const getEvent = useCallback((event_id: number) => {
    const eventUrl = `https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/events?eventid=${event_id}`;
    (async () => {
      try {
        const res = await axios.get<Event>(eventUrl);
        setEvent(res.data);
      } catch (error) {
        console.log("イベントが取得できません。");
      }
    })();
  }, []);
  return { getEvent, event };
};
