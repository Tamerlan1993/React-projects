import React from "react";
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

class Stripes extends React.Component {
  state = {
    stripes: [
      {
        background: "#98c5e9",
        left: "120",
        rotate: "25",
        top: "-260",
        delay: "0"
      },
      {
        background: "#ffffff",
        left: "360",
        rotate: "25",
        top: "-397",
        delay: "200"
      },
      {
        background: "#98c5e9",
        left: "600",
        rotate: "25",
        top: "-498",
        delay: "400"
      }
    ]
  };
  showStripes = () => {
    return this.state.stripes.map((stripe, i) => {
      return (
        <Animate
          key={i}
          show={true}
          start={{
            background: "#FFF",
            opacity: 0,
            left: 0,
            rotate:0,
            top:0
          }}
          enter={{
            rotate:[stripe.rotate],
            top:[stripe.top],
            background: [stripe.background],
            opacity: [1],
            left: [stripe.left],
            timing: { delay: [stripe.delay], duration: 200, ease: easePolyOut },
          }}
        >
          {({ background, opacity, left,top,rotate }) => {
            return (
              <div className="stripe" style={{ background, opacity,transform:`rotate(${rotate}deg) translate(${left}px,${top}px)` }} />
            );
          }}
        </Animate>
      );
    });
  };
  render() {
    return <div className="featured_stripes">{this.showStripes()}</div>;
  }
}

export default Stripes;
