import React from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Event } from "../../../types/api/Event";

type Props = {
  event: Event;
};

export const EventCard: FC<Props> = (props) => {
  const { event } = props;
  const url = "/events/event?event_id=" + event?.event_id;
  const navigation = useNavigate();
  const onClickLink = () => {
    navigation(url, { state: { event_id: event?.event_id } });
  };

  return (
    <>
      <div
        className="relative flex items-center flex-col h-96 w-64 rounded-md overflow-hidden shadow-md flex-grow md:max-w-[300px] hover:cursor-pointer hover:bg-gray-100 hover:opacity-80 duration-500"
        onClick={onClickLink}
      >
        {event.event_left_date && event.event_left_date > 0 ? (
          <div className="absolute flex justify-center items-center w-full h-10 bg-red-600 text-white origin-center left-[35%] rotate-[30deg] top-4">
            あと{event?.event_left_date}日
          </div>
        ) : (
          <>
            {event.event_left_date === 0 ? (
              <>
                <div className="absolute flex justify-center items-center w-full h-10 bg-red-600 text-white origin-center left-[35%] rotate-[30deg] top-4">
                  本日〆切
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
        {/* {event.event_left_date && event.event_left_date === 0 ? (
          <div className="absolute flex justify-center items-center w-full h-10 bg-red-600 text-white origin-center left-[35%] rotate-[30deg] top-4">
            本日締切り
          </div>
        ) : (
          <></>
        )} */}
        <figure className="overflow-hidden w-full h-1/3 rounded-md">
          <img
            src={event?.event_image}
            className="w-full h-full object-cover object-bottom"
            alt=""
          />
        </figure>
        <div className="flex flex-col justify-start items-center h-2/3 w-full gap-2 p-2">
          <div className="font-main text-xl w-full truncate">{event?.event_name}</div>
          <div className="flex items-center h-10 text-md w-full">
            <img
              src={event?.event_owner?.user_icon}
              alt=""
              className="w-10 h-full rounded-full"
            />
            <span>主催：{event?.event_owner?.user_name}</span>
          </div>
          <div className="h-1/2 w-full flex flex-wrap justify-center items-center text-xl">
            <div className="w-1/2 truncate">場所:{event?.event_place}</div>
            <div className="w-1/2">
              日程:
              {event?.event_date
                ?.split("-")
                .map((value, index) =>
                  index == 0 ? "" : index == 1 ? value + "/" : value
                )}
            </div>
            <div className="w-1/2">予算:{event?.event_budget}円</div>
            <div className="w-1/2">
              人数:{event?.event_guest_length}/{event?.event_max_guest}
            </div>
          </div>
          <div className="w-full h-14 flex justify-center flex-grow items-center">
            <button className="mx-2 flex-row items-center justify-around py-2 px-4 bg-gray-300 rounded-lg ring-2 ring-gray-200 flex w-3/4 h-12">
              <span className="text-sm mx-2 font-bold">詳しく見る</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
