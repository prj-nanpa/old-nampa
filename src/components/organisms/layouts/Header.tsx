import React from "react";
// import { useLogout } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  // const { logout } = useLogout();

  // const handleLogout = () => {
  //   logout();
  //   setTimeout(() => {
  //     navigate("logout");
  //   }, 1000);
  // };

  const handleMyPage = () => {
    navigate("/user/mypage");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>

      <header className="flex flex-row items-center justify-between h-16 bg-pink-400/10 px-4">
        <button className="text-2xl hover:opacity-70 duration-500" onClick={handleHome}>
          {/* <img src={`${process.env.PUBLIC_URL}/images/nanpa.png`} alt="" /> */}
          NANPA
        </button>
        <button
          onClick={handleMyPage}
          className="flex items-center gap-2 p-2 border-2 border-pink-400 bg-pink-300 rounded-2xl px-3 text-white hover:bg-pink-400/80 duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="hidden text-xl font-bold md:block">my-page</span>
        </button>

        {/* // テストのためにログアウト機能を追加 */}
        {/* <button onClick={handleLogout}>logout</button> */}
      </header>
    </>
  );
};
