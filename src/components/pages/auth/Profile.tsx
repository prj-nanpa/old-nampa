import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useOthers } from "../../../hooks/api/get/useProfile";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";
import { CardListsUser } from "../../organisms/events/CardListsUser";

type State = {
  user_id: string;
};

export const Profile = () => {
  const location = useLocation();
  const { user_id } = location.state as State;

  const { getOthers, othersInfo } = useOthers();

  useEffect(() => getOthers(user_id), []);

  return (
    <>
      <PersonalInfo user={othersInfo} />

      <CardListsUser
        events={othersInfo?.join_event}
        eventListTitle="参加予定のイベント"
      ></CardListsUser>

      <CardListsUser
        events={othersInfo?.host_event}
        eventListTitle="主催イベント"
      ></CardListsUser>

      <CardListsUser
        events={othersInfo?.past_event}
        eventListTitle="過去に参加したイベント"
      ></CardListsUser>
    </>
  );
};
