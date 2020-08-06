import React from "react";
import Tagger from "../components/elements/Tagger";
import { suggestedIndicators, suggestedTimeFrames } from "../utils/constants";

class EditStrategy extends React.Component {
  constructor(props) {
    super(props);

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

    this.state = {
      name,
      description,
      entry_conditions,
      strategy_id,
      exit_conditions,
      time_frames: time_frames ? time_frames.split(",") : [],
      risk_per_trade,
      risk_to_reward,
      indicators: indicators ? indicators.split(",") : [],
      indicators_suggestions: suggestedIndicators,
      time_frames_suggestions: suggestedTimeFrames,
    };

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.editStrategy = this.editStrategy.bind(this);
    this.updateIndicators = this.updateIndicators.bind(this);
    this.updateTimeFrames = this.updateTimeFrames.bind(this);
    this.updateIndicatorSuggestions = this.updateIndicatorSuggestions.bind(
      this
    );
    this.updateTimeFrameSuggestions = this.updateTimeFrameSuggestions.bind(
      this
    );
  }

  handleTextFieldChange(event, fieldName) {
    const value = event.target.value;
    this.setState({ [fieldName]: value.trim() });
  }

  editStrategy() {
    const payload = Object.assign({}, this.state);
    payload.indicators = payload.indicators.join(",");
    payload.time_frames = payload.time_frames.join(",");

    fetch(`/strategies/${this.props.user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.status > 200) {
        console.log("success");
      } else {
        console.log("failed");
      }
    });
  }

  updateIndicators(indicators) {
    this.setState({ indicators });
  }

  updateIndicatorSuggestions(indicators) {
    this.setState({ indicators_suggestions: indicators });
  }

  updateTimeFrames(time_frames) {
    this.setState({ time_frames });
  }

  updateTimeFrameSuggestions(timeFrames) {
    this.setState({ time_frames_suggestions: timeFrames });
  }

  render() {
    const {
      name,
      description,
      entry_conditions,
      exit_conditions,
      time_frames,
      risk_per_trade,
      risk_to_reward,
      indicators,
      indicators_suggestions,
      time_frames_suggestions,
    } = this.state;

    return (
      <div className="container">
        <div className="edit-strategy-wrapper">
          <h3 className="edit-strategy-header">Editing: {name}</h3>
          <div className="edit-strategy-inputs-container">
            <p className='edit-label'>Name</p>
            <input
              onChange={(e) => this.handleTextFieldChange(e, "name")}
              className="edit-strategy-input"
              defaultValue={name}
            />
            <p>Description</p>
            <textarea
              onChange={(e) => this.handleTextFieldChange(e, "description")}
              className="edit-strategy-textarea"
              defaultValue={description}
            ></textarea>
            <Tagger
              placeholder="Indicators"
              updateSelectedOptions={this.updateIndicators}
              updateSuggestions={this.updateIndicatorSuggestions}
              selectedOptions={indicators}
              suggestions={indicators_suggestions}
              defaultSuggestions={suggestedIndicators}
            />
            <Tagger
              placeholder="Times Frames"
              updateSelectedOptions={this.updateTimeFrames}
              updateSuggestions={this.updateTimeFrameSuggestions}
              selectedOptions={time_frames}
              suggestions={time_frames_suggestions}
              defaultSuggestions={suggestedTimeFrames}
            />
            <p className='edit-label'>Entry conditions</p>
            <textarea
              onChange={(e) =>
                this.handleTextFieldChange(e, "entry_conditions")
              }
              className="edit-strategy-textarea"
              defaultValue={entry_conditions}
            ></textarea>
            <p className='edit-label'>Exit conditions</p>
            <textarea
              onChange={(e) => this.handleTextFieldChange(e, "exit_conditions")}
              className="edit-strategy-textarea"
              defaultValue={exit_conditions}
            ></textarea>
            <p className='edit-label'>Risk per trade</p>
            <input
              onChange={(e) => this.handleTextFieldChange(e, "risk_per_trade")}
              className="edit-strategy-input"
              defaultValue={risk_per_trade}
            />
            <p className='edit-label'>Risk to reward</p>
            <input
              onChange={(e) => this.handleTextFieldChange(e, "risk_to_reward")}
              className="edit-strategy-input"
              defaultValue={risk_to_reward}
              className="edit-strategy-input"
            />
            <button
              onClick={this.editStrategy}
              className="edit-strategy-btn"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditStrategy;
