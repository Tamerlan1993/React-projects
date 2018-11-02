import React from "react";

const Location = () => {
  return (
    <div className="location_wrapper">
      <iframe
        title="unique"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.34194183093!2d-74.03927127135601!3d40.75904032921967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C+New+York%2C+NY!5e0!3m2!1sen!2s!4v1539457963826"
        width="100%"
        height="400"
        frameBorder="0"
        allowFullScreen
      />
      <div className="location_tag">
          <div>
              Location
          </div>
      </div>
    </div>
  );
};

export default Location;
