import React from "react";
import { Link } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

class StrategyCard extends React.Component {
  render() {
    const { strategyInfo } = this.props;

    return (
      <div className="strategy-card-main-container">
        <div className="strategy-card-name-container">
          <Link
            className="strategy-card-link"
            to={{ pathname: `/strategies/view/${strategyInfo.strategy_id}`, state: { strategyInfo } }}
          >
            <span className="strategy-card-title">{strategyInfo.name}</span>
          </Link>
        </div>
        <div className="strategy-card-icons-container">
        <Link
            className="strategy-card-link"
            to={{ pathname: `/strategies/view/${strategyInfo.strategy_id}`, state: { strategyInfo } }}
          >
            <VisibilityIcon />
          </Link>

          <Link className="strategy-card-link" to="/strategies/view">
            <EditIcon />
          </Link>

          <Link className="strategy-card-link" to="/strategies/view">
            <DeleteIcon />
          </Link>
        </div>
      </div>
    );
  }
}

export default StrategyCard;
