import React from "react";
import { Tag } from "../../ui/mixs";
import Blocks from "./Blocks";

function MatchesHome() {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag bck="#0e1731" size="50px" color="#FFF">
          Matches
        </Tag>
        <Blocks />
        <Tag bck="#fff" size="22px" color="#0e1731" link={true} linkTo="/team">
          See more matches
        </Tag>
      </div>
    </div>
  );
}

export default MatchesHome;
