import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  tag_id: string;
  tag_name: string;
};

export const GenreSearchCard = (props: Props) => {
  const { tag_id, tag_name } = props;
  const [imgURL, setImageURL] = useState<string>(
    `${process.env.PUBLIC_URL}/images/main_1.png`
  );

  const tag_id_temp = Number(tag_id);
  const tags_arr = [tag_id_temp];

  const imageURL = (): string => {
    switch (tag_id) {
      case "7":
        return `${process.env.PUBLIC_URL}/images/main_1-min.png`;
      case "4":
        return `${process.env.PUBLIC_URL}/images/main_2-min.png`;
      case "3":
        return `${process.env.PUBLIC_URL}/images/main_3-min.png`;
      case "1":
        return `${process.env.PUBLIC_URL}/images/main_4-min.png`;
      default:
        return `${process.env.PUBLIC_URL}/images/main_1-min.png`;
    }
  };
  useLayoutEffect(() => {
    setImageURL(imageURL);
  }, []);

  const navigate = useNavigate();
  const onClickLink = () => {
    navigate("/events", { state: { genreData: { tagsid: tags_arr } } });
  };
  return (
    <>
      <div
        onClick={onClickLink}
        className="relative w-3/4 h-24 flex flex-row bg-gray-100 items-center rounded-md shadow-md px-2 md:flex-col md:h-72 md:w-1/5 md:px-0 md:rounded-sm overflow-hidden md:flex-grow hover:cursor-pointer hover:bg-gray-200 duration-500"
      >
        <figure className="w-20 h-20 bg-red-400 overflow-hidden rounded-full md:w-full md:h-1/2 md:rounded-none">
          <img
            src={imgURL}
            className="w-full h-full object-cover object-bottom"
            alt=""
          />
        </figure>
        <div className="flex justify-around flex-grow md:flex-col">
          <div className="font-main text-md flex-grow  font-bold text-center w-1/2 md:w-full md:flex-grow-0">
            {tag_name}イベント
          </div>
          <div className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <div className="hidden mx-2 flex-row items-center justify-around py-2 px-4 bg-gray-300 rounded-lg ring-2 ring-gray-200 md:flex">
            <span className="text-sm mx-2 font-bold">詳しく見る</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
