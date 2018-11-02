import React, { Component } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
export default class Header extends Component {
  state = {
    isHeaderBgSet: false
  };
  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    if (window.scrollY > 10) {
      this.setState({
        isHeaderBgSet: true
      });
    } else {
      this.setState({
        isHeaderBgSet: false
      });
    }
  };

  render() {
    return (
      <AppBar
        style={{
          backgroundColor: this.state.isHeaderBgSet ? "#2f2f2f" : "transparent",
          boxShadow: "none",
          padding: "10px 0"
        }}
      >
        <Toolbar>
          <div className="header_logo">
            <div className="font_righteous header_logo_venue">The Venue</div>
            <div className="header_logo_title">Musical Events</div>
          </div>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => this.props.toggleDrawer(true)}
          >
            <MenuIcon open={true} />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
