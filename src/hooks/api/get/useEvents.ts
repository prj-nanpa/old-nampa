import { useCallback } from "react";
import axios from "axios";

import { Event } from "../../../types/api/Event";

type EventApi = {
  events: Event[];
};

export const useEvents = () => {
  const getEvents = useCallback(async (query?: string) => {
    const eventsUrl =
      "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/events" + query;

    try {
      const resNearEvents = await axios.get<EventApi>(eventsUrl);
      return resNearEvents.data.events;
    } catch (error) {
      console.log("イベントが取得できません。");
    }
  }, []);

  return { getEvents };
};
