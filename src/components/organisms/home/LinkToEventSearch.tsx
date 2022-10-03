import React from "react";
import { useNavigate } from "react-router-dom";

export const LinkToEventSearch = () => {
  const navigate = useNavigate();
  const onClickLink = () => {
    navigate("/events");
  };
  return (
    <>
      {/* <div style={{ margin: "50px 0" }}>
        <h2>イベントを検索</h2>
        <p>サブタイトルサブタイトルサブタイトルサブタイトル</p>
        <Link to={"/events"}>イベント検索する</Link>
      </div> */}

      <div className="flex flex-row h-20 md:h-auto justify-center items-center w-full max-w-2xl">
        <div className="flex flex-col md:w-1/2">
          <span className="hidden md:inline-block font-main text-xl border-b-2 border-black">
            イベントを検索する
          </span>
          <span className="hidden md:inline-block text-sm text-gray-500">
            サブタイトルサブタイトルサブタイトルサブタイトル
          </span>
          <button
            onClick={onClickLink}
            className="flex flex-row items-center justify-around py-4 px-8 bg-gray-300 rounded-xl ring-2 ring-gray-200 flex-grow-0 md:w-64 my-4 hover:bg-gray-400/70 duration-500"
          >
            <span className="text-sm mx-2 font-bold">イベントを検索する</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <figure className="hidden md:flex justify-center items-center w-1/2 h-auto">
          <img
            src={`${process.env.PUBLIC_URL}/images/main_top.png`}
            alt=""
            className="w-auto h-auto object-cover"
          />
        </figure>
      </div>
    </>
  );
};
