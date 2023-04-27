import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Icons/Logo";

const HeaderLogo = () => {
  return (
    <Link to="/" style={{ display: "flex" }}>
      <Logo sx={{ fontSize: "50px", marginRight: "10px" }} />
    </Link>
  );
};

export default HeaderLogo;
