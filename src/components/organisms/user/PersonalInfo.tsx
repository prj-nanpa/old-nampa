import React from "react";
import { FC } from "react";

import { useLoginUserContext } from "../../../context/LoginUserContext";
import { User } from "../../../types/api/User";

type Props = {
  user?: User;
  onClickButtonToEdit?: () => void;
};

export const PersonalInfo: FC<Props> = (props: Props) => {
  const { loginUser } = useLoginUserContext();
  const { user, onClickButtonToEdit } = props;

  const tagColor = user?.user_tags?.map((tag) => "tag-color-" + tag.tag_color);

  return (
    <>
      <div className="flex flex-col w-72 m-2 px-4 gap-1 shadow-xl rounded md:w-full max-w-4xl md:flex-row">
        <div className="flex flex-row md:w-32 flex-shrink-0">
          <div className="w-1/2 md:w-full">
            <img
              src={
                !user?.user_icon
                  ? "https://placehold.jp/666dc7/ffffff/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%0A%E6%9C%AA%E8%A8%AD%E5%AE%9A"
                  : user?.user_icon
              }
              className="object-contain w-auto h-auto"
              alt=""
            />
          </div>
          <div className="flex flex-row flex-wrap w-1/2 md:hidden">
            <div className="w-1/2 h-1/2 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="w-1/2 h-1/2 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14"
                fill="#000000"
                viewBox="0 0 50 50"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 12 3 C 7.0414839 3 3 7.0414839 3 12 L 3 38 C 3 42.958516 7.0414839 47 12 47 L 38 47 C 42.958516 47 47 42.958516 47 38 L 47 12 C 47 7.0414839 42.958516 3 38 3 L 12 3 z M 12 5 L 38 5 C 41.877484 5 45 8.1225161 45 12 L 45 38 C 45 41.877484 41.877484 45 38 45 L 12 45 C 8.1225161 45 5 41.877484 5 38 L 5 12 C 5 8.1225161 8.1225161 5 12 5 z M 38 7 C 36.904545 7 36 7.9045455 36 9 L 36 12 C 36 13.095455 36.904545 14 38 14 L 41 14 C 42.095455 14 43 13.095455 43 12 L 43 9 C 43 7.9045455 42.095455 7 41 7 L 38 7 z M 38 9 L 41 9 L 41 12 L 38 12 L 38 9 z M 25 12 C 21.331661 12 18.01623 13.540914 15.648438 16 L 8 16 A 1.0001 1.0001 0 0 0 7 17 L 7 37 C 7 40.301625 9.6983746 43 13 43 L 37 43 C 40.301625 43 43 40.301625 43 37 L 43 17 A 1.0001 1.0001 0 0 0 42 16 L 34.351562 16 C 31.98377 13.540914 28.668339 12 25 12 z M 25 14 C 31.073477 14 36 18.926523 36 25 C 36 31.073477 31.073477 36 25 36 C 18.926523 36 14 31.073477 14 25 C 14 18.926523 18.926523 14 25 14 z M 25 16 A 1.0001 1.0001 0 0 0 24.589844 16.083984 C 19.831681 16.311415 16 20.186041 16 25 C 16 29.959394 20.041635 34 25 34 C 29.958365 34 34 29.959394 34 25 C 34 20.187371 30.170385 16.313404 25.414062 16.083984 A 1.0001 1.0001 0 0 0 25 16 z M 9 18 L 14.068359 18 C 12.766308 20.024088 12 22.423973 12 25 C 12 32.158523 17.841477 38 25 38 C 32.158523 38 38 32.158523 38 25 C 38 22.423973 37.233692 20.024088 35.931641 18 L 41 18 L 41 37 C 41 39.220375 39.220375 41 37 41 L 13 41 C 10.779625 41 9 39.220375 9 37 L 9 18 z M 25 18 C 28.877635 18 32 21.121394 32 25 C 32 28.878606 28.877635 32 25 32 C 21.122365 32 18 28.878606 18 25 C 18 21.121394 21.122365 18 25 18 z"
                />
              </svg>
            </div>
            <div className="w-1/2 h-1/2 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14"
                fill="#000000"
                viewBox="0 0 50 50"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"
                />
              </svg>
            </div>
            <div className="w-1/2 h-1/2 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14"
                fill="#000000"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z M18,8.999c0,4.08-2.957,8.399-8.466,8.943C10.28,17.413,11,16.662,11,16.662 S8,14,7.775,10.522C8.81,10.838,9.888,10.999,11,10.999h2v-2.5c0-0.001,0-0.001,0-0.001C13.002,7.118,14.12,6,15.5,6 C16.881,6,18,7.119,18,8.5C18,8.5,18,8.92,18,8.999z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-3 flex-shrink flex-grow">
          <div className="nameToSL flex flex-col gap-2 md:w-full md:flex-row md:flex-wrap md:gap-y-0 md:gap-x-4">
            <div className="flex flex-col justify-center h-16 w-full text-xl md:w-2/5">
              <div className="font-bold border-b-2 border-black">名前</div>
              <div className="h-1/2">
                {!user?.user_nickname ? (
                  <>未登録</>
                ) : (
                  <>{user?.user_nickname}</>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center h-16 w-full text-xl md:w-2/5">
              <div className="font-bold border-b-2 border-black">本名</div>
              <div className="h-1/2">{user?.user_name}</div>
            </div>
            <div className="flex flex-col justify-center h-16 w-full text-xl md:w-2/5">
              <div className="font-bold border-b-2 border-black">所属CoE</div>
              <div className="h-1/2">
                {!user?.user_coe ? <>未登録</> : <>{user?.user_coe}</>}
              </div>
            </div>
            <div className="flex flex-col justify-center h-16 w-full text-xl md:w-2/5">
              <div className="font-bold border-b-2 border-black">所属SL</div>
              <div className="h-1/2">
                {!user?.user_sl ? <>未登録</> : <>{user?.user_sl}</>}
              </div>
            </div>
            <div className="flex flex-col justify-center h-16 w-full text-xl md:hidden">
              <div className="font-bold border-b-2 border-black">
                メールアドレス
              </div>
              <div>{user?.user_email}</div>
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-center w-full md:w-4/5 text-xl">
              <div className="font-bold border-b-2 border-black">
                一言自己紹介
              </div>
              <div className="h-24 break-words">
                {!user?.user_comment ? <>未登録</> : <>{user?.user_comment}</>}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-center w-full md:w-4/5 text-xl gap-4">
              <div className="font-bold border-b-2 border-black">
                興味のあるタグ
              </div>
              <div className="flex flex-row flex-wrap gap-y-2">
                {user && user.user_tags?.length == 0
                  ? "タグが設定されていません"
                  : ""}
                {user?.user_tags?.map((tag, i) => (
                  <>
                    <span
                      key={i}
                      className={`mx-2 px-4 py-1 rounded-lg ${tagColor?.[i]} font-bold text-white ring-2 text-sm`}
                    >
                      {tag.tag_value}
                    </span>
                  </>
                ))}
                {/* <div className="w-full md:w-36">
                  <button className="w-full flex flex-row items-center justify-around py-1 px-8 bg-gray-400/80 rounded-xl ring-2 ring-gray-200">
                    <span className="text-sm mx-2 font-bold">もっと見る</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-row">
            <div className="w-1/2">
              <div className="text-xl font-bold border-b-2 border-black">
                SNS
              </div>
              <div>
                <div className="w-full flex justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 stroke-gray-700"
                    viewBox="0 0 24 24"
                    fill="#FFFFFF"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{user?.user_email}</span>
                </div>
                <div className="w-full flex justify-start items-center">
                  <a
                    href={`https://www.instagram.com/${user?.user_instagramid}/?hl=ja`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 stroke-gray-700"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 12 3 C 7.0414839 3 3 7.0414839 3 12 L 3 38 C 3 42.958516 7.0414839 47 12 47 L 38 47 C 42.958516 47 47 42.958516 47 38 L 47 12 C 47 7.0414839 42.958516 3 38 3 L 12 3 z M 12 5 L 38 5 C 41.877484 5 45 8.1225161 45 12 L 45 38 C 45 41.877484 41.877484 45 38 45 L 12 45 C 8.1225161 45 5 41.877484 5 38 L 5 12 C 5 8.1225161 8.1225161 5 12 5 z M 38 7 C 36.904545 7 36 7.9045455 36 9 L 36 12 C 36 13.095455 36.904545 14 38 14 L 41 14 C 42.095455 14 43 13.095455 43 12 L 43 9 C 43 7.9045455 42.095455 7 41 7 L 38 7 z M 38 9 L 41 9 L 41 12 L 38 12 L 38 9 z M 25 12 C 21.331661 12 18.01623 13.540914 15.648438 16 L 8 16 A 1.0001 1.0001 0 0 0 7 17 L 7 37 C 7 40.301625 9.6983746 43 13 43 L 37 43 C 40.301625 43 43 40.301625 43 37 L 43 17 A 1.0001 1.0001 0 0 0 42 16 L 34.351562 16 C 31.98377 13.540914 28.668339 12 25 12 z M 25 14 C 31.073477 14 36 18.926523 36 25 C 36 31.073477 31.073477 36 25 36 C 18.926523 36 14 31.073477 14 25 C 14 18.926523 18.926523 14 25 14 z M 25 16 A 1.0001 1.0001 0 0 0 24.589844 16.083984 C 19.831681 16.311415 16 20.186041 16 25 C 16 29.959394 20.041635 34 25 34 C 29.958365 34 34 29.959394 34 25 C 34 20.187371 30.170385 16.313404 25.414062 16.083984 A 1.0001 1.0001 0 0 0 25 16 z M 9 18 L 14.068359 18 C 12.766308 20.024088 12 22.423973 12 25 C 12 32.158523 17.841477 38 25 38 C 32.158523 38 38 32.158523 38 25 C 38 22.423973 37.233692 20.024088 35.931641 18 L 41 18 L 41 37 C 41 39.220375 39.220375 41 37 41 L 13 41 C 10.779625 41 9 39.220375 9 37 L 9 18 z M 25 18 C 28.877635 18 32 21.121394 32 25 C 32 28.878606 28.877635 32 25 32 C 21.122365 32 18 28.878606 18 25 C 18 21.121394 21.122365 18 25 18 z" />
                    </svg>
                  </a>
                  <span>
                    {!user?.user_instagramid ? (
                      <>未登録</>
                    ) : (
                      <>{user?.user_instagramid}</>
                    )}
                  </span>
                </div>
                <div className="w-full flex justify-start items-center">
                  <a
                    className="hover:opacity-70"
                    href={`https://twitter.com/${user?.user_twitterid}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 stroke-gray-700 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z M18,8.999c0,4.08-2.957,8.399-8.466,8.943C10.28,17.413,11,16.662,11,16.662 S8,14,7.775,10.522C8.81,10.838,9.888,10.999,11,10.999h2v-2.5c0-0.001,0-0.001,0-0.001C13.002,7.118,14.12,6,15.5,6 C16.881,6,18,7.119,18,8.5C18,8.5,18,8.92,18,8.999z" />
                    </svg>
                  </a>
                  <span>
                    {!user?.user_twitterid ? (
                      <>未登録</>
                    ) : (
                      <>{user?.user_twitterid}</>
                    )}
                  </span>
                </div>
                <div className="w-full flex justify-start items-center">
                  <a
                    href={`https://ja-jp.facebook.com/${user?.user_facebookid}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 stroke-gray-700"
                      viewBox="0 0 50 50"
                      fill="#000000"
                    >
                      <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z" />
                    </svg>
                  </a>
                  <span>
                    {!user?.user_facebookid ? (
                      <>未登録</>
                    ) : (
                      <>{user?.user_facebookid}</>
                    )}
                    {user?.user_facebookid}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-3/4 flex justify-center items-center">
              <img
                src={user?.user_lineqr}
                alt=""
                className="w-1/2 h-auto object-contain"
              />
            </div>
          </div>

          {loginUser?.user_id === user?.user_id ? (
            <div>
              <div className="w-full my-6 flex justify-end">
                <button
                  onClick={onClickButtonToEdit}
                  className="w-full flex flex-row items-center justify-center py-4 px-8 bg-gray-300 rounded-xl ring-2 ring-gray-200 md:w-36 hover:bg-gray-400/70 duration-500"
                >
                  <span className="text-sm mx-2 font-bold">編集</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* <h2>個人設定</h2>
      <p>アイコン画像</p>
      <img src={user?.user_icon} alt="ユーザーアイコン" />
      <p>名前: {user?.user_nickname}</p>
      <p>本名: {user?.user_name}</p>
      <p>所属CoE: {user?.user_coe}</p>
      <p>所属SL: {user?.user_sl}</p>
      <p>自己紹介: {user?.user_comment}</p>
      <p>
        興味あるタグ:
        {user?.user_tags?.map((tag, i) => (
          <>
            <div key={i}>
              <span style={{ color: tag.tag_color }}>{tag.tag_value}</span>
            </div>
          </>
        ))}
      </p>
      <h3>SNS</h3>
      <p>メール:{user?.user_email}</p>
      <p>instagram:{user?.user_instagramid}</p>
      <p>twitter:{user?.user_twitterid}</p>
      <p>facebook:{user?.user_facebookid}</p>
      <img src={user?.user_lineqr} alt="ラインQRコード" /> */}

      {/* {loginUser?.uid === user?.user_id ? (
        <>
          <button type="button" onClick={onClickButtonToEdit}>
            編集する
          </button>
        </>
      ) : (
        ""
      )} */}

      <hr />
    </>
  );
};
