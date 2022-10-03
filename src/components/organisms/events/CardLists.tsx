import React from "react";
import { FC } from "react";
import { Event } from "../../../types/api/Event";
import { EventCard } from "./EventCard";
import { useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../../../context/UserInfoContext";
import { EventCardMoreButton } from "../../atoms/buttons/EventCardMoreButton";

type Props = {
  events: Event[];
  eventListTitle: string;
};

export const CardLists: FC<Props> = (props) => {
  // やりたいこと homeから検索のための情報をPropsで受け取って検索へ遷移

  //ユーザの情報を取得
  const { userInfo } = useUserInfoContext();

  //ユーザの登録しているタグの情報を取得 & 整形
  const tags_arr = userInfo?.user_tags?.map((tags) => tags.tag_id);

  // イベントデータをpropsから取得 & 整形
  const { events, eventListTitle } = props;
  const sliceEvent = events.length > 3 ? events.slice(0, 3) : events;

  const url = "/events";
  const navigation = useNavigate();

  // イベント検索へ遷移用
  const onClickLink = () => {
    navigation(url);
  };

  // イベント・関心のありそうなイベントへ遷移用
  const onClickLinkTag = () => {
    navigation(url, { state: { genreData: { tagsid: tags_arr } } });
  };

  return (
    <>
      <div className="w-72 md:w-full flex flex-row flex-wrap gap-2 gap-y-6 justify-start">
        <div className="text-xl md:w-full md:text-3xl font-bold border-b-2 border-black mb-1">
          {eventListTitle}
        </div>
        {sliceEvent.length != 0 ? (
          <>
            {sliceEvent.map((event) => (
              <>
                {event.event_id && (
                  <>
                    <EventCard event={event} key={event.event_id} />
                  </>
                )}
              </>
            ))}
          </>
        ) : (
          <span>{eventListTitle}はありません</span>
        )}
        {/* イベントが3つよりあるとき更に検索するボタンを表示 */}
        {events.length > 3 && (
          <>
            <div className="w-full flex justify-center items-center">
              {eventListTitle === "あなたが関心のありそうなイベント" ? (
                <>
                  <EventCardMoreButton onClick={onClickLinkTag} />
                </>
              ) : (
                <>
                  <EventCardMoreButton onClick={onClickLink} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
