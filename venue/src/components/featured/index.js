import React from "react";
import Carousel from "./Carousel"
import Timer from "../timer/Timer";

const Featured=()=>{
    return(
        <div style={{position:'relative'}}>
            <Carousel/>
            <div className="artist_name">
                <div className="wrapper">
                    Arianna Grande
                </div>
            </div>
            <Timer/>
        </div>
    )
}
export default Featured;