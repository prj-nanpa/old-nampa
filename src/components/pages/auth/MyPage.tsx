import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";
import { useUserInfoContext } from "../../../context/UserInfoContext";
import { CardListsUser } from "../../organisms/events/CardListsUser";

export const MyPage: FC = () => {
  const { userInfo } = useUserInfoContext();

  const navigate = useNavigate();
  const onClickButtonToEdit = () => {
    navigate("edit");
  };
  return (
    <>

      <CardListsUser
        events={userInfo?.join_event}
        eventListTitle="参加予定のイベント"
      ></CardListsUser>

      <CardListsUser
        events={userInfo?.host_event}
        eventListTitle="主催イベント"
      ></CardListsUser>

      <PersonalInfo user={userInfo} onClickButtonToEdit={onClickButtonToEdit} />

      <CardListsUser
        events={userInfo?.past_event}
        eventListTitle="過去に参加したイベント"
      ></CardListsUser>
    </>
  );
};
