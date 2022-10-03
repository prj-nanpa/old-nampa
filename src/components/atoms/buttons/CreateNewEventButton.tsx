import React from "react";
import { useNavigate } from "react-router-dom";

export const CreateNewEventButton = () => {
  const navigate = useNavigate();
  const onClickLink = () => {
    navigate("/events/event/create");
  };

  return (
    <>
      {/* <Link to={"/events/event/create"}>イベント作成</Link> */}
      <div
        onClick={onClickLink}
        className="fixed w-10 h-10 md:w-20 md:h-20 right-0 bottom-0 m-2 bg-gray-300 rounded-full overflow-hidden hover:cursor-pointer hover:bg-gray-400/70 duration-500"
      >
        <div className="w-full h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-10 md:w-10 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      </div>
    </>
  );
};
