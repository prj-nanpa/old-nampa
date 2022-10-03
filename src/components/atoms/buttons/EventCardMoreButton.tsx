import React, { FC } from "react";

type Props = {
  onClick: () => void;
};

export const EventCardMoreButton: FC<Props> = (props) => {
  const { onClick } = props;
  return (
    <>
      <button
        onClick={onClick}
        className="mt-1 py-8 px-4 md:py-2 h-6 w-72 md:w-full flex flex-row items-center justify-around bg-pink-100 rounded-lg ring-2 ring-pink-300 hover:bg-pink-300/80 duration-500"
      >
        <span className="text-sm mx-2 font-bold">さらに検索する</span>
      </button>
    </>
  );
};
