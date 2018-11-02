import React from "react";
import { Fade, Slide } from "react-reveal";
import Btn from "../utils/button";

class Discount extends React.Component {
  state = {
    discountStart: 0,
    discountEnd: 30
  };

  porcentage = () => {
    if (this.state.discountStart < this.state.discountEnd) {
      this.setState(prevState => {
        return {
          discountStart: prevState.discountStart + 1
        };
      });
    }
  };

  componentDidUpdate() {
    setTimeout(() => {
      this.porcentage();
    }, 50);
  }

  render() {
    return (
      <div className="center_wrapper">
        <div className="discount_wrapper">
          <Fade delay={700} onReveal={() => this.porcentage()}>
            <div className="discount_porcentage">
              <span>{this.state.discountStart}%</span>
              <span>OFF</span>
            </div>
          </Fade>
          <Slide right>
            <div className="discount_description">
              <h3>Purchase tickets for 20th June</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                placeat accusamus odit odio. Sit deserunt iste veritatis sint
                facere minima illum dolorum consequuntur eligendi modi, est sed
                eaque earum laborum.
              </p>
              <Btn
                text="Purchase tickets"
                bck="#ffa800"
                color="#ffffff"
                link=""
              />
            </div>
          </Slide>
        </div>
      </div>
    );
  }
}

export default Discount;
