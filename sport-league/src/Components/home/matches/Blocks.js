import React from "react";
import { firebaseMatches } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../ui/mixs";

import MatchBlock from "../../ui/match_block";
import { Slide } from "react-reveal";

class Blocks extends React.Component {
  state = {
    matches: []
  };
  componentDidMount = () => {
    firebaseMatches
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({
          matches: reverseArray(matches)
        });
      });
  };

  showMatches = matches => {
    return matches
      ? matches.map(match => {
          return (
            <Slide key={match.id} bottom>
              <div className="item">
                <div className="wrapper">
                  <MatchBlock match={match} />
                </div>
              </div>
            </Slide>
          );
        })
      : null;
  };
  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;
