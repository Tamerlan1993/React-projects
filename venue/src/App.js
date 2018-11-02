import React, { Component } from "react";
import "./resources/styles.css";
import Header from "./components/partials/Header";
import Sidebar from "./components/partials/Sidebar";
import Featured from "./components/featured";
import VenueNfo from "./components/venueNfo";
import HighLight from "./components/highlights";
import Pricing from "./components/pricing";
import Location from "./components/location/Location";
import Footer from "./components/partials/Footer";
import { Element } from "react-scroll";
class App extends Component {
  state = {
    isSidebarOpen: false
  };
  toggleDrawer = value => {
    this.setState({
      isSidebarOpen: value
    });
  };
  render() {
    return (
      <div
        className="App"
        style={{ height: "1500px", backgroundColor: "cornflowerblue" }}
      >
        <Header toggleDrawer={this.toggleDrawer} />
        <Sidebar
          toggleDrawer={this.toggleDrawer}
          isSidebarOpen={this.state.isSidebarOpen}
        />
        <Element name="Featured">
          <Featured />
        </Element>
        <Element name="VenueNFO">
          <VenueNfo />
        </Element>
        <Element name="highlights">
          <HighLight />
        </Element>
        <Element name="Pricing">
          <Pricing />
        </Element>
        <Element name="Location">
          <Location />
        </Element>
        <Footer />
      </div>
    );
  }
}

export default App;
