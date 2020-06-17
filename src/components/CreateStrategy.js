import React from "react";
import Tagger from './elements/Tagger';

class CreateStrategy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingModal: false,
      name: "",
      description: "",
      entry_conditions: "",
      exit_conditions: "",
      time_frames: "",
      risk_per_trade: "",
      risk_to_reward: "",
      indicators: "",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createStrategy = this.createStrategy.bind(this);
  }

  toggleModal() {
    this.setState({ isShowingModal: !this.state.isShowingModal });
  }

  handleInputChange(event, inputName) {
    const value = event.target.value;
    this.setState({ [inputName]: value.trim() });
  }

  createStrategy() {
    // TODO: Validate all inputs 
    fetch("/strategies/11", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((response) => {
      if (response.status > 200) {
        console.log("success");
      } else {
        console.log("failed");
      }
    });
  }

  render() {
    const { isShowingModal } = this.state;

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
              onChange={(e) => this.handleInputChange(e, "name")}
              className="modal-input"
              placeholder="Name"
            />
            <textarea
              className="modal-textarea"
              placeholder="Description"
            ></textarea>
            <Tagger placeholder='Indicators' suggestions={['option 1', 'option 2', 'option 3']} />
            <Tagger placeholder='Times Frames' suggestions={['H1', 'H4', 'M5']} />
            <textarea
              className="modal-textarea"
              placeholder="Entry conditions"
            ></textarea>
            <textarea
              className="modal-textarea"
              placeholder="Exit conditions"
            ></textarea>
            <input
              onChange={(e) => this.handleInputChange(e, "risk_per_trade")}
              className="modal-input"
              placeholder="Risk per trade"
            />
            <input
              onChange={(e) => this.handleInputChange(e, "risk_to_reward")}
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
