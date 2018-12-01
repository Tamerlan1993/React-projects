import React from 'react'
import PromotionAnimation from "./Animation"
import PromotionEnroll from "./Enroll"
function Promotion() {
  return (
    <div className="promotion_wrapper" style={{
        background:"#ffffff"
    }}>
      <div className="container">
          <PromotionAnimation/>
          <PromotionEnroll/>
      </div>
    </div>
  )
}

export default Promotion
