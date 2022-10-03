import React from "react";
import { Link } from "@mui/material";

export const Logout = () => {
  return(
    <><p>Logoutしました。</p>
    <Link href="/login" variant="body2">ログインはこちら</Link></>
  );
}