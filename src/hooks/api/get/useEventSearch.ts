import { useCallback } from "react";
import axios from "axios";

import { Event } from "../../../types/api/Event";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";

export type EventApi = {
  event_length?: number;
  events: Event[];
};

export const useEventSearch = () => {
  const getSearchEvents = useCallback(
    async (data?: SearchEventList, page?: number) => {
      console.log(data, page);

      let tags = "";
      if (data?.tagsid) {
        tags = "&tagid=" + data?.tagsid[0];
        for (let i = 1; i < data?.tagsid.length; i++) {
          tags = tags + "+" + data?.tagsid[i];
        }
      }

      let tagsQuery = "";
      if (data?.tagsid?.length !== 0) {
        tagsQuery = tags;
      }

      let budgetQuery = "";
      if (data?.budget) {
        budgetQuery = `&budget=${data?.budget}`;
      }

      let minguestQuery = "";
      if (data?.minguest) {
        minguestQuery = `&minguest=${data?.minguest}`;
      }

      let maxguestQuery = "";
      if (data?.maxguest) {
        maxguestQuery = `&maxguest=${data?.maxguest}`;
      }

      let fromdateQuery = "";
      if (data?.fromdate) {
        fromdateQuery = `&fromdate=${data?.fromdate}`;
      }

      let todateQuery = "";
      if (data?.todate) {
        todateQuery = `&todate=${data?.todate}`;
      }

      let numQuery = "";
      if (data?.num) {
        numQuery = `&num=${data?.num}`;
      }

      let pagequery = "";
      if (page !== undefined) {
        pagequery = `&page=${page}`;
      }

      const eventsUrl =
        "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/events_search?" +
        tagsQuery +
        budgetQuery +
        minguestQuery +
        maxguestQuery +
        fromdateQuery +
        todateQuery +
        numQuery +
        pagequery;

      console.log(eventsUrl);

      try {
        const resNearEvents = await axios.get<EventApi>(eventsUrl);
        return resNearEvents.data;
      } catch (error) {
        console.log("イベントが取得できません。");
      }
    },
    []
  );

  return { getSearchEvents };
};
