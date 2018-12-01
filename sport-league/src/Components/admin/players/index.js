import React from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../../HOC/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@material-ui/core";
import { firebasePlayers } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../ui/mixs";

class AdminPlayers extends React.Component {
  state = {
    isLoading: true,
    players: []
  };
  componentDidMount = () => {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);
      this.setState({
        isLoading: false,
        players: reverseArray(players)
      });
    });
  };

  render() {
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.players ? (
                  this.state.players.map(player => {
                    return (
                      <TableRow key={player.id}>
                        <TableCell>
                          <Link to={`/admin_players/add_players/${player.id}`}>
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin_players/add_players/${player.id}`}>
                            {player.lastname}
                          </Link>
                        </TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>No data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress
                thickness={7}
                style={{
                  color: "#98c5e9"
                }}
              />
            ) : null}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
