import React from "react";

function Header() {
  return (
    <header className="header">
      <img
        src={require("../../assets/Img/logo.png")}
        alt=""
        width={175}
        height={37}
      />
    </header>
  );
}

export default Header;
