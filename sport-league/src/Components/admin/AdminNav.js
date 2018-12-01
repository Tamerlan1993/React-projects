import React from "react";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { firebase } from "../../firebase";
const AdminNav = () => {
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches"
    },
    {
      title: "Add match",
      linkTo: "/admin_matches/edit_match"
    },

    {
      title: "Players",
      linkTo: "/admin_players"
    },
    {
      title: "Add players",
      linkTo: "/admin_players/add_players"
    }
  ];
  const renderItems = () => {
    return links.map(link => {
      return (
        <Link to={link.linkTo} key={link.title}>
          <ListItem
            button
            style={{
              color: "#fff",
              fontWeight: "300",
              borderBottom: "1px solid #353535"
            }}
          >
            {link.title}
          </ListItem>
        </Link>
      );
    });
  };

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Logout success");
        },
        err => {
          console.log("Error while logging out");
        }
      );
  };

  return (
    <div>
      {renderItems()}
      <ListItem
        button
        style={{
          color: "#fff",
          fontWeight: "300",
          borderBottom: "1px solid #353535"
        }}
        onClick={() => logoutHandler()}
      >
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;
