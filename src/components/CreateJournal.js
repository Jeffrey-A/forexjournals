import React from "react";
import { currencies } from "../utils/constants";

class CreateJournal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isShowingModal: !this.state.isShowingModal });
  }

  render() {
    const { isShowingModal } = this.state;

    if (!isShowingModal) {
      return <button onClick={this.toggleModal}>Create Journal</button>;
    }

    return (
      <div className="modal-main-container">
        <div className="modal-overlay"></div>
        <span className="close-modal-btn" onClick={this.toggleModal}>
          X
        </span>
        <div className="modal-container">
          <h1 className="modal-header">Create Journal</h1>
          <div className="create-journal-input-container">
            <select className="journal-select">
              <option selected="true" disabled="disabled">
                Pair
              </option>
              {currencies.map((currency) => (
                <option>{currency}</option>
              ))}
            </select>
            <select className="journal-select">
              <option selected="true" disabled="disabled">
                Order type
              </option>
              <option>Buy</option>
              <option>Sell</option>
              <option>Buy Stop</option>
              <option>Sell Stop</option>
              <option>Buy Limit</option>
              <option>Sell Limit</option>
            </select>
            <input
              className="journal-input"
              placeholder="chart link"
              type="url"
            />
            <textarea
              className="journal-textarea"
              placeholder="Errors made"
            ></textarea>
            <textarea
              className="journal-textarea"
              placeholder="Comments"
            ></textarea>
            <button className="journal-btn">Create Journal</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateJournal;
