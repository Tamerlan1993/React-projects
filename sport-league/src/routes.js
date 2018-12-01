import React from "react";
import Layout from "./HOC/Layout";
import { Switch } from "react-router-dom";
import Home from "./Components/home";
import SignIn from "./Components/SignIn";
import Dashboard from "./Components/admin/Dashboard";
import AdminMatches from "./Components/admin/matches";
import AddEditMatch from "./Components/admin/matches/addEditMatch";

import PrivateRoutes from "./Components/authRoutes/privateRoutes";
import PublicRoutes from "./Components/authRoutes/publicRoutes";
import AdminPlayers from "./Components/admin/players";
import AddEditPlayers from "./Components/admin/players/addEditPlayers";
import TheTeam from "./Components/theTeam";
import TheMatches from "./Components/Matches";
import NotFound from "./Components/ui/NotFound";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/admin_players"
          exact
          component={AdminPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/add_players"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/add_players/:id"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match"
          exact
          component={AddEditMatch}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PublicRoutes
          {...props}
          restricted={false}
          exact
          component={Home}
          path="/"
        />
        <PublicRoutes
          {...props}
          restricted={false}
          exact
          component={TheTeam}
          path="/the_team"
        />
        <PublicRoutes
          {...props}
          restricted={true}
          exact
          component={SignIn}
          path="/signin"
        />
        <PublicRoutes
          {...props}
          restricted={false}
          exact
          component={TheMatches}
          path="/matches"
        />
        <PublicRoutes
          {...props}
          restricted={false}
          exact
          component={NotFound}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
