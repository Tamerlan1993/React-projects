import React from "react";
import { Slide } from "react-reveal";

class Timer extends React.Component {
  state = {
    deadline: "Jan, 1 ,2019",
    days: "",
    minutes: "",
    hours: "",
    seconds: ""
  };

  componentDidMount() {
    setInterval(() => {
      this.daysLeft(this.state.deadline);
    }, 1000);
  }

  daysLeft = deadline => {
    let time = Date.parse(new Date(deadline)) - Date.parse(new Date());

    if (time < 0) {
      console.log("Date passed");
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));

      this.setState({
        days,
        seconds,
        minutes,
        hours
      });
    }
  };

  render() {
    return (
      <Slide left delay={1000}>
        <div className="countdown_wrapper">
          <div className="countdown_top">Events in</div>
          <div className="countdown_bottom">
            <div className="countdown_item">
              <div className="countdown_time">{this.state.days}</div>
              <div className="countdown_tag">Days</div>
            </div>
            <div className="countdown_item">
              <div className="countdown_time">{this.state.hours}</div>
              <div className="countdown_tag">hours</div>
            </div>
            <div className="countdown_item">
              <div className="countdown_time">{this.state.minutes}</div>
              <div className="countdown_tag">minutes</div>
            </div>
            <div className="countdown_item">
              <div className="countdown_time">{this.state.seconds}</div>
              <div className="countdown_tag">seconds</div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}

export default Timer;
