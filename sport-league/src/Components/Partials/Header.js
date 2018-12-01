import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CityLogo from "../ui/Icons";
export default function Header() {
  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#98c5c9",
        boxShadow: "none",
        padding: "10px 0",
        borderBottom: "2px solid #00285e"
      }}
    >
      <Toolbar
        style={{
          display: "flex"
        }}
      >
        <div style={{ flexGrow: "1" }}>
          <div className="header_logo">
            <CityLogo link={true} linkTo="/" width="70px" height="70px" />
          </div>
        </div>
        <Link to="/the_team">
          <Button color="inherit">The Team</Button>
        </Link>
        <Link to="/matches">
          <Button color="inherit">The Matches</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
