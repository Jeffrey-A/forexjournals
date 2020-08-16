import React from 'react';
import { Link } from 'react-router-dom';

class ViewStrategy extends React.Component {
  constructor(props) {
    super(props);
  }

  displayAltTextIfEmpty(text) {
    if (!text) {
      return 'No content to show';
    }
    return text;
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
              <Link className="go-to-journal" to={`/journals/view/${strategy_id}`}>Go To Journal</Link>
            </div>
          </div>

          <div className="view-strategy-content-container">
            <h3 className="view-strategy-field-header">Overview</h3>
            <p>{this.displayAltTextIfEmpty(description)}</p>
          </div>

          <div className="view-strategy-content-container">
            <h3 className="view-strategy-field-header">Entry Conditions</h3>
            <p>{this.displayAltTextIfEmpty(entry_conditions)}</p>
          </div>

          <div className="view-strategy-content-container">
            <h3 className="view-strategy-field-header">Exit Conditions</h3>
            <p>{this.displayAltTextIfEmpty(exit_conditions)}</p>
          </div>

          <div className="view-strategy-content-container">
            <h3 className="view-strategy-field-header">Time Frames</h3>
            <p>{this.displayAltTextIfEmpty(time_frames)}</p>
          </div>

          <div className="view-strategy-content-container">
            <h3 className="view-strategy-field-header">Indicators</h3>
            <p>{this.displayAltTextIfEmpty(indicators)}</p>
          </div>

          <div className="view-strategy-content-container">
            <h3 className="view-strategy-field-header">Risk to reward</h3>
            <p>{this.displayAltTextIfEmpty(risk_to_reward)}</p>
          </div>

          <div className="view-strategy-content-container">
            <h3 className="view-strategy-field-header">Risk per trade</h3>
            <p>{this.displayAltTextIfEmpty(risk_per_trade)}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewStrategy;
