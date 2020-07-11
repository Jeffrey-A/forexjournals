import React from "react";
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
          <Link className='strategy-card-link' to="/strategies/view">
            <span className="strategy-card-title">{name}</span>
          </Link>
        </div>
        <div className="strategy-card-icons-container">
          <Link className='strategy-card-link' to="/strategies/view">
            <VisibilityIcon />
          </Link>

          <Link className='strategy-card-link' to="/strategies/view">
            <EditIcon />
          </Link>

          <Link className='strategy-card-link' to="/strategies/view">
            <DeleteIcon />
          </Link>
        </div>
      </div>
    );
  }
}

export default StrategyCard;
