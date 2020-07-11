import React from "react";
import ViewStrategy from "../pages/ViewStrategy";
import { Link } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

class StrategyCard extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div className="strategy-card-main-container">
        <div className="strategy-card-name-container">
          <span>{name}</span>
        </div>
        <div className="strategy-card-icons-container">
          <Link to="/strategies/view">
            <VisibilityIcon />
          </Link>

          <Link to="/strategies/view">
            <EditIcon />
          </Link>

          <Link to="/strategies/view">
            <DeleteIcon />
          </Link>
        </div>
      </div>
    );
  }
}

export default StrategyCard;
