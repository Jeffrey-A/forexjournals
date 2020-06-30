import React from "react";
import { currencies, orderTypes } from "../utils/constants";

class CreateJournal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      pair: "",
      comments: "",
      order_type: "",
      pips_gained_lost: "",
      img_link: "",
      errors: "",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleTextFieldChange(event, fieldName) {
    const value = event.target.value;
    this.setState({ [fieldName]: value.trim() });
  }

  handleSelectChange(event, selectType) {
    const options = event.target.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        this.setState({ [selectType]: options[i].value });
        break;
      }
    }
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
            <select
              onChange={(e) => this.handleSelectChange(e, "pair")}
              className="journal-select"
            >
              <option selected="true" disabled="disabled">
                Pair
              </option>
              {currencies.map((currency) => (
                <option value={currency}>{currency}</option>
              ))}
            </select>
            <select
              className="journal-select"
              onChange={(e) => this.handleSelectChange(e, "order_type")}
            >
              <option selected="true" disabled="disabled">
                Order type
              </option>
              {orderTypes.map((order) => (
                <option value={order}>{order}</option>
              ))}
            </select>
            <input
              className="journal-input"
              placeholder="chart link"
              onChange={(e) => this.handleTextFieldChange(e, "img_link")}
              type="url"
            />
            <textarea
              className="journal-textarea"
              placeholder="Errors made"
              onChange={(e) => this.handleTextFieldChange(e, "errors")}
            ></textarea>
            <textarea
              className="journal-textarea"
              placeholder="Comments"
              onChange={(e) => this.handleTextFieldChange(e, "comments")}
            ></textarea>
            <button className="journal-btn">Create Journal</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateJournal;
