import React from "react";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

class StrategyCard extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div className="strategy-card-main-container">
        <div className="strategy-card-name-container">
          <span>{name}</span>
        </div>
        <div className="strategy-card-icons-container">
          <VisibilityIcon />
          <EditIcon />
          <DeleteIcon />
        </div>
      </div>
    );
  }
}

export default StrategyCard;
