import React, { Component } from "react";
import Btn from "../utils/button";
import { Zoom } from "react-reveal";

export default class Pricing extends Component {
  state = {
    prices: [100, 150, 200],
    desc: [
      "Deleniti expedita quae facilis unde architecto consectetur!",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      " Pariatur repellat ad nesciunt impedit dolorem obcaecati esse porro reprehenderit nihil, illum asperiores quas distinctio."
    ],
    links: ["htttps://sales/a", "htttps://sales/b", "htttps://sales/c"],
    positions: ["Balcony", "Medium", "Start"],
    delays: [500, 0, 500]
  };

  showBoxes = () => {
    return this.state.prices.map((box, i) => {
      return (
        <Zoom key={i} delay={this.state.delays[i]}>
          <div className="pricing_item">
            <div className="pricing_inner_wrapper">
              <div className="pricing_title">
                <span>${this.state.prices[i]}</span>
                <span>{this.state.positions[i]}</span>
              </div>
              <div className="pricing_description">{this.state.desc[i]}</div>
              <div className="pricing_buttons">
                <Btn
                  bck="#ffa800"
                  color="white"
                  link={this.state.links[i]}
                  text="Purchse"
                />
              </div>
            </div>
          </div>
        </Zoom>
      );
    });
  };

  render() {
    return (
      <div className="bck_black">
        <div className="center_wrapper pricing_section">
          <h2>Pricing section</h2>
          <div className="pricing_wrapper">{this.showBoxes()}</div>
        </div>
      </div>
    );
  }
}
