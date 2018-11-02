import React from "react";
import { Button } from "@material-ui/core";

import TicketIcon from "../../resources/images/icons/ticket.png";

const Btn = props => {
  return (
    <div>
      <Button
        size="small"
        variant="contained"
        target="_blank"
        href={props.link}
        style={{
          background: props.bck,
          color: props.color
        }}
      >
        <img src={TicketIcon} alt="" className="iconImage" />
        {props.text}
      </Button>
    </div>
  );
};

export default Btn;
