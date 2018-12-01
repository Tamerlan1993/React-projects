import React from "react";
import CityLogo from "../ui/Icons";

function Footer() {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={true} linkTo="/" width="70px" height="70px" />
      </div>
      <div className="footer_discl">
        Manchester city 2018. All right reserved
      </div>
    </footer>
  );
}

export default Footer;
