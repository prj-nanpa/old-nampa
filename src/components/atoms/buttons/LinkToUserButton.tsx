import React, { FC } from "react";
import { Link } from "react-router-dom";
import { UserMinInfo } from "../../../types/api/UserMinInfo";

type Props = {
  user_info?: UserMinInfo;
};
export const LinkToUserButton: FC<Props> = (props) => {
  const { user_info } = props;
  const url = "/user?userid=" + user_info?.user_id;
  return (
    <>
      <Link to={url} state={{ user_id: user_info?.user_id }}>
        <img src={user_info?.user_icon} alt="ゲストアイコン" />
      </Link>
    </>
  );
};
