import React, { useEffect, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useEvent } from "../../../hooks/api/get/useEvent";
import {
  EventApplyInfo,
  useEventApply,
} from "../../../hooks/api/postPutDelete/useEventApply";
import { useEventCreateEditDelete } from "../../../hooks/api/postPutDelete/useEventCreateEditDelete";
import { UserMinInfo } from "../../../types/api/UserMinInfo";
import { useUser } from "../../../hooks/api/get/useUser";

export type EventDeleteFormID = {
  event_id: number;
};

type Props = {
  event_id: number;
};

export const EventDetail: FC<Props> = (props) => {
  const { loginUser } = useLoginUserContext();

  const { event_id } = props;

  // ユーザコンテキストの更新用関数
  const { getUser } = useUser();

  const { eventApply } = useEventApply();

  const [applyEvent, setApplyEvent] = useState<EventApplyInfo>({
    event_id: null,
    user_id: null,
  });

  useEffect(() => {
    if (loginUser && event_id) {
      setApplyEvent({
        event_id: event_id,
        user_id: loginUser?.user_id,
      });
    }
  }, [loginUser, event_id]);

  // 個別イベントの取得
  const { getEvent, event } = useEvent();
  useEffect(() => {
    getEvent(event_id);
  }, []);

  // ゲストのIDを配列化
  const guestID = event?.event_guests?.map((guest) => guest?.user_id);

  // タグの色の配列化
  const tagColor = event?.event_tags?.map(
    (tag) => "tag-color-" + tag.tag_color
  );

  // レンダリング時の参加登録の有無を表すフラグの定義
  const tempEventJoinFlag = guestID?.includes(loginUser?.user_id);
  const [eventJoinFlag, setEventJoinFlag] = useState<boolean | undefined>(
    tempEventJoinFlag
  );
  // console.log(tempEventJoinFlag);
  // 初期化の監視
  useEffect(() => {
    setEventJoinFlag(tempEventJoinFlag);
  }, [tempEventJoinFlag]);

  // このフラグが変更された際もイベントを再度取得し画面を再描画する
  useEffect(() => {
    getEvent(event_id);
  }, [eventJoinFlag]);

  const navigate = useNavigate();

  // イベント編集ボタン
  const onClickButtonToEdit = () => {
    navigate("edit", {
      state: {
        event,
      },
    });
  };

  const { eventCreateEditDelete } = useEventCreateEditDelete();

  // イベント削除ボタン
  const onClickButtonToDelete = async () => {
    event && console.log(event.event_id);
    await eventCreateEditDelete("delete", { event_id: event_id });
    // データ変更後にユーザ情報を更新
    loginUser && getUser(loginUser?.user_id);
    navigate(-1);
  };

  // イベント参加登録ボタン
  const onClickApply = async () => {
    console.log(applyEvent);
    // イベント参加登録を行う
    await eventApply("post", applyEvent);
    // データ変更後にユーザ情報を更新
    loginUser && getUser(loginUser?.user_id);
    setEventJoinFlag(!eventJoinFlag);
  };

  // イベント参加登録解除ボタン
  const onClickApplyCancel = async () => {
    console.log(applyEvent);
    // イベント参加登録解除を行う
    await eventApply("delete", applyEvent);
    // データ変更後にユーザ情報を更新
    loginUser && getUser(loginUser?.user_id);
    setEventJoinFlag(!eventJoinFlag);
  };

  // クリックするとユーザページへ
  const onClickUser = (userInfo?: UserMinInfo) => {
    if (userInfo) {
      const url = "/user?userid=" + userInfo.user_id;
      navigate(url, { state: { user_id: userInfo.user_id } });
    }
  };

  return (
    <>
      <div className="flex flex-row items-center w-full max-w-4xl flex-wrap gap-4 gap-x-0">
        <div className="w-full flex flex-col-reverse md:flex-row md:items-end">
          <div className="w-full md:w-1/2 text-2xl md:text-3xl font-bold border-b-2 border-black">
            イベント
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
            <div className="border border-gray-300 rounded-md flex flex-col justify-center items-center py-4 px-8">
              <span>応募締め切り</span>
              <span>{event?.event_deadline}</span>
            </div>
          </div>
        </div>
        <figure className="flex items-center justify-center w-full h-auto p-4">
          <img
            src={event?.event_image}
            className="h-auto max-h-64 md:max-h-full md:h-full w-auto object-contain rounded-md"
          />
        </figure>
        <div className="flex flex-row flex-wrap gap-y-2 w-full">
          {event?.event_tags?.map((value, i) => (
            <>
              <span
                className={`tag ${tagColor?.[i]}  ring-2 text-white`}
                key={value.tag_id}
              >
                {value.tag_value}
              </span>
            </>
          ))}
        </div>
        <div className="w-full text-2xl">{event?.event_name}</div>
        <div className="w-full text-md">{event?.event_note}</div>
        <div className="w-full flex flex-col border-2 items-center rounded-md border-gray-600 gap-10 py-10">
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">最小募集人数</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_min_guest}</span>人
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">最大募集人数</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_max_guest}</span>人
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">主催者</div>
            <div className="w-1/3 text-center flex justify-center items-center">
              <figure
                className="w-10 h-10 overflow-hidden rounded-full"
                onClick={() => onClickUser(event?.event_owner)}
              >
                <img
                  src={event?.event_owner?.user_icon}
                  className="w-full h-full object-cover object-bottom"
                  alt=""
                />
              </figure>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">予算</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_budget}</span>円以下
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">日時</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_date}</span>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">場所</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_place}</span>
            </div>
          </div>

          <div className="flex flex-col w-full items-center md:w-3/4 gap-4">
            <div className="w-1/2 text-center text-3xl border-b-2 border-gray-800">
              参加者
            </div>

            {event?.event_guests?.length ? (
              <>
                <div className="w-full flex flex-row flex-wrap justify-center gap-5">
                  {event?.event_guests?.map((guest, i) => (
                    <>
                      <figure
                        key={i}
                        className="w-10 h-10 overflow-hidden rounded-full"
                        onClick={() => onClickUser(guest)}
                      >
                        <img
                          src={guest.user_icon}
                          className="w-full h-full object-cover object-bottom"
                          alt=""
                        />
                      </figure>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <span>参加者はまだいません</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-around w-full max-w-4xl">
        {loginUser?.user_id === event?.event_owner?.user_id ? (
          // イベントのユーザIDがログインユーザと同じ場合
          <>
            <button
              className="w-1/4 rounded-md flex flex-col justify-center items-center py-8 font-bold text-xl text-black border-4 border-green-500/80 bg-green-400 hover:cursor-pointer hover:bg-green-400/70 duration-500"
              type="button"
              onClick={onClickButtonToEdit}
            >
              編集
            </button>
            <button
              className="w-1/4 border rounded-md flex flex-col justify-center items-center py-8 font-bold text-xl text-white border-4 border-red-500/80 bg-red-400 hover:cursor-pointer hover:bg-red-400/70 duration-500"
              type="button"
              onClick={onClickButtonToDelete}
            >
              削除
            </button>
          </>
        ) : (
          <>
            {eventJoinFlag ? (
              <>
                <button
                  className="w-1/4 rounded-md flex flex-col justify-center items-center py-8 font-bold text-xl text-white border-4 border-red-500/80 bg-red-400 hover:cursor-pointer hover:bg-red-400/70 duration-500"
                  onClick={onClickApplyCancel}
                >
                  参加登録解除
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-1/4 rounded-md flex flex-col justify-center items-center py-8 font-bold text-xl text-white border-4 border-blue-500/80 bg-blue-400 hover:cursor-pointer hover:bg-blue-400/70 duration-500"
                  onClick={onClickApply}
                >
                  参加登録
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
