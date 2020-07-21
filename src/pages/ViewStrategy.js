import React from "react";

class ViewStrategy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      description,
      entry_conditions,
      exit_conditions,
      time_frames,
      indicators,
      risk_to_reward,
      strategy_id,
      risk_per_trade,
    } = this.props.location.state.strategyInfo;

    return (
      <div className="container">
        <div>
          <div className="view-strategy-header-container">
            <h1 className="view-strategy-header">{name}</h1>
            <div className='view-strategy-header-btn-container'>
              <span className="go-to-journal">Go To Journal</span>
            </div>
          </div>

          <div>
            <p>Overview</p>
            <p>{description}</p>
          </div>

          <div>
            <p>Entry Conditions</p>
            <p>{entry_conditions}</p>
          </div>

          <div>
            <p>Exit Conditions</p>
            <p>{exit_conditions}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewStrategy;
