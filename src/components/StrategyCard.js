import React from "react";

class StrategyCard extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div className="strategy-card-main-container">
        <div className="strategy-card-name-container">
          <span>{name}</span>
        </div>
        <div className="strategy-card-icons-container">
          <span>View</span>
          <span>Edit</span>
          <span>Delete</span>
        </div>
      </div>
    );
  }
}

export default StrategyCard;
