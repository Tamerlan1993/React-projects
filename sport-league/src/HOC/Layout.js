import React from "react";
import Header from "../Components/Partials/Header";
import Footer from "../Components/Partials/Footer";

export default function Layout(props) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
