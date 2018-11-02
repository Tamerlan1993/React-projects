import React, { Component } from "react";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import {scroller} from"react-scroll";

export default class Sidebar extends Component {
  render() {
    const scrollToElement=(element)=>{
      scroller.scrollTo(element,{
        delay:100,
        duration:1500,
        smooth:true,
        offset:-150
      });
      this.props.toggleDrawer(false);
    }
    return (
      <Drawer
        onClose={() => this.props.toggleDrawer(false)}
        anchor="right"
        open={this.props.isSidebarOpen}
      >
        <div>
          <List component="nav">
            <ListItem button onClick={() => scrollToElement("Featured")}>
              <ListItemText primary="Event starts in" />
            </ListItem>

            <ListItem button onClick={() => scrollToElement("VenueNFO")}>
              <ListItemText primary="Venue NFO" />
            </ListItem>

            <ListItem button onClick={() => scrollToElement('highlights')}>
              <ListItemText primary="Highlights" />
            </ListItem>

            <ListItem button onClick={() => scrollToElement("Pricing")}>
              <ListItemText primary="Pricing" />
            </ListItem>

            <ListItem button onClick={() => scrollToElement("Location")}>
              <ListItemText primary="Location" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}
