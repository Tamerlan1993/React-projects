import React from "react";
import Slider from "react-slick";

import slider_one from "../../resources/images/slide_one.jpg";
import slider_two from "../../resources/images/slide_two.jpg";
import slider_three from "../../resources/images/slide_three.jpg";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div
      style={{
        overflow: "hidden",
        height: `${window.innerHeight}px`
      }}
      className="carrousel_wrapper"
    >
      <Slider {...settings}>
        <div>
          <div
            className="carrousel_image"
            style={{
              backgroundImage: `url(${slider_one})`,
              height: `${window.innerHeight}px`
            }}
          />
        </div>
        <div>
          <div
            className="carrousel_image"
            style={{
              backgroundImage: `url(${slider_two})`,
              height: `${window.innerHeight}px`
            }}
          />
        </div>
        <div>
          <div
            className="carrousel_image"
            style={{
              backgroundImage: `url(${slider_three})`,
              height: `${window.innerHeight}px`
            }}
          />
        </div>
      </Slider>
    </div>
  );
};
export default Carousel;
