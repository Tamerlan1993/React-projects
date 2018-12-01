import React from "react";
import { Animate } from "react-move";
import { easePolyInOut } from "d3-ease";

import FeaturedPlayer from "../../../Resources/images/featured_player.png";

class Text extends React.Component {
  animateNumber = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          rotate: 0
        }}
        enter={{
          opacity: [1],
          rotate: [360],
          timing: { delay: 0, duration: 1000, ease: easePolyInOut }
        }}
      >
        {({ opacity, rotate }) => {
          return (
            <div
              className="featured_number"
              style={{
                opacity,
                transform: `translate(260px,170px) rotateY(${rotate}deg)`
              }}
            >
              3
            </div>
          );
        }}
      </Animate>
    );
  };

  animateFirstText = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          x: 503,
          y: 450
        }}
        enter={{
          x: [273],
          y: [450],
          opacity: [1],
          timing: { delay: 0, duration: 500, ease: easePolyInOut }
        }}
      >
        {({ opacity, x, y }) => {
          return (
            <div
              className="featured_first"
              style={{
                opacity,
                zIndex:1,
                transform: `translate(${x}px,${y}px)`
              }}
            >
              League
            </div>
          );
        }}
      </Animate>
    );
  };
  animateSecondText = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0,
          x: 503,
          y: 586
        }}
        enter={{
          x: [273],
          y: [586],
          opacity: [1],
          timing: { delay: 400, duration: 500, ease: easePolyInOut }
        }}
      >
        {({ opacity, x, y }) => {
          return (
            <div
              className="featured_second"
              style={{
                opacity,
                zIndex:1,
                transform: `translate(${x}px,${y}px)`
              }}
            >
              Championships
            </div>
          );
        }}
      </Animate>
    );
  };

  animatePlayer = () => {
    return (
      <Animate
        show={true}
        start={{
          opacity: 0
        }}
        enter={{
          opacity: [1],
          timing: { delay: 800, duration: 500, ease: easePolyInOut }
        }}
      >
        {({ opacity, x, y }) => {
          return (
            <div
              className="featured_player"
              style={{
                opacity,
                background:`url(${FeaturedPlayer}) no-repeat`,
                transform: `translate(550px,221px)`
              }}
            />
          );
        }}
      </Animate>
    );
  };
  render() {
    return (
      <div className="featured_text">
        {this.animateNumber()}
        {this.animateFirstText()}
        {this.animateSecondText()}
        {this.animatePlayer()}
      </div>
    );
  }
}

export default Text;
