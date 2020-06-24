import React from "react";
import Tagger from "./elements/Tagger";

class CreateStrategy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingModal: false,
      name: "",
      description: "",
      entry_conditions: "",
      exit_conditions: "",
      time_frames: [],
      risk_per_trade: "",
      risk_to_reward: "",
      indicators: [],
      indicators_suggestions: ["option 1", "option 2", "option 3"],
      time_frames_suggestions: ["H1", "H2", "H4"],
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.createStrategy = this.createStrategy.bind(this);
    this.updateIndicators = this.updateIndicators.bind(this);
    this.updateTimeFrames = this.updateTimeFrames.bind(this);
  }

  toggleModal() {
    this.setState({ isShowingModal: !this.state.isShowingModal });
  }

  handleTextFieldChange(event, fieldName) {
    const value = event.target.value;
    this.setState({ [fieldName]: value.trim() });
  }

  createStrategy() {
    // TODO: pass textarea content
    const payload = Object.assign({}, this.state);
    payload.indicators = payload.indicators.join(",");
    payload.time_frames = payload.time_frames.join(",");

    fetch("/strategies/11", {
      method: "POST",
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
  updateTimeFrames(time_frames) {
    this.setState({ time_frames });
  }

  render() {
    const {
      isShowingModal,
      indicators,
      time_frames,
      indicators_suggestions,
      time_frames_suggestions,
    } = this.state;

    if (!isShowingModal) {
      return <button onClick={this.toggleModal}>Create Strategy</button>;
    }

    return (
      <div className="modal-main-container">
        <div className="modal-overlay"></div>
        <span className="close-modal-btn" onClick={this.toggleModal}>
          X
        </span>
        <div className="modal-container">
          <h1 className="modal-header">Create Strategy</h1>
          <div className="create-strategy-inputs-container">
            <input
              onChange={(e) => this.handleTextFieldChange(e, "name")}
              className="modal-input"
              placeholder="Name"
            />
            <textarea
              onChange={(e) => this.handleTextFieldChange(e, 'description')}
              className="modal-textarea"
              placeholder="Description"
            ></textarea>
            <Tagger
              placeholder="Indicators"
              updateSelectedOptions={this.updateIndicators}
              selectedOptions={indicators}
              suggestions={indicators_suggestions}
            />
            <Tagger
              placeholder="Times Frames"
              updateSelectedOptions={this.updateTimeFrames}
              selectedOptions={time_frames}
              suggestions={time_frames_suggestions}
            />
            <textarea
              onChange={(e) => this.handleTextFieldChange(e, 'entry_conditions')}
              className="modal-textarea"
              placeholder="Entry conditions"
            ></textarea>
            <textarea
              onChange={(e) => this.handleTextFieldChange(e, 'exit_conditions')}
              className="modal-textarea"
              placeholder="Exit conditions"
            ></textarea>
            <input
              onChange={(e) => this.handleTextFieldChange(e, "risk_per_trade")}
              className="modal-input"
              placeholder="Risk per trade"
            />
            <input
              onChange={(e) => this.handleTextFieldChange(e, "risk_to_reward")}
              className="modal-input"
              placeholder="Risk to reward"
            />
            <button onClick={this.createStrategy} className="modal-create-btn">
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStrategy;
