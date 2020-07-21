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

            <div className="view-strategy-header-btn-container">
              <span className="go-to-journal">Go To Journal</span>
            </div>
          </div>

          <div>
            <h3 className='view-strategy-field-header'>Overview</h3>
            <p>{description}</p>
          </div>

          <div>
            <h3 className='view-strategy-field-header'>Entry Conditions</h3>
            <p>{entry_conditions}</p>
          </div>

          <div>
            <h3 className='view-strategy-field-header'>Exit Conditions</h3>
            <p>{exit_conditions}</p>
          </div>

          <div>
            <h3 className='view-strategy-field-header'>Time Frames</h3>
            <p>{time_frames}</p>
          </div>

          <div>
            <h3 className='view-strategy-field-header'>Indicators</h3>
            <p>{indicators}</p>
          </div>

          <div>
            <h3 className='view-strategy-field-header'>Risk to reward</h3>
            <p>{risk_to_reward}</p>
          </div>

          <div>
            <h3 className='view-strategy-field-header'>Risk per trade</h3>
            <p>{risk_per_trade}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewStrategy;
