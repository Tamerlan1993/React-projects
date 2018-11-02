import React from 'react'
import {Fade} from "react-reveal";

const Footer = () => {
  return (
      <footer className="bck_red">

          <Fade delay={500}>
              <div className="font_righteous footer_logo_venue">
                  The Venue
              </div>
              <div className="footer_copyright">
                  the venue {new Date().toLocaleDateString()} All right reserved.
              </div>
          </Fade>

      </footer>
  )
}

export default Footer
