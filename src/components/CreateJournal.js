import React from 'react';
import { currencies, orderTypes } from '../utils/constants';

// TODO: add input validation and perform API request
class CreateJournal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      pair: '',
      comments: '',
      order_type: '',
      pips_gained_lost: '',
      img_link: '',
      errors: '',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.performAPICall = this.performAPICall.bind(this);
    this.handlePipsChance = this.handlePipsChance.bind(this);
  }

  handleTextFieldChange(event, fieldName) {
    const { value } = event.target;
    this.setState({ [fieldName]: value.trim() });
  }

  handleSelectChange(event, selectType) {
    const { options } = event.target;

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        this.setState({ [selectType]: options[i].value });
        break;
      }
    }
  }

  performAPICall() {
    // TODO: Perform input Validation
    const payload = { ...this.state };

    fetch('/api/v1/journals/2/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.status > 200) {
        console.log('success');
      } else {
        console.log('failed');
      }
    });
  }

  toggleModal() {
    this.setState({ isShowingModal: !this.state.isShowingModal });
  }

  handlePipsChance(e, isSelectEvent = false) {
    let input;
    let signs;

    if (isSelectEvent) {
      input = e.target.nextSibling;
      signs = e.target.options;
    } else {
      input = e.target;
      signs = input.previousSibling.options;
    }

    let selectedSign = '';

    for (let i = 0; i < signs.length; i++) {
      if (signs[i].selected) {
        selectedSign = signs[i].value;
        break;
      }
    }

    if (input.value.length) {
      this.setState({ pips_gained_lost: selectedSign + input.value });
    } else {
      this.setState({ pips_gained_lost: '' });
    }
  }

  render() {
    const { isShowingModal } = this.state;

    if (!isShowingModal) {
      return <button onClick={this.toggleModal}>Create Journal</button>;
    }

    return (
      <div className="modal-main-container">
        <div className="modal-overlay" />
        <span className="close-modal-btn" onClick={this.toggleModal}>
          X
        </span>
        <div className="modal-container">
          <h1 className="modal-header">Create Journal</h1>
          <div className="create-journal-input-container">
            <select
              onChange={(e) => this.handleSelectChange(e, 'pair')}
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
              onChange={(e) => this.handleSelectChange(e, 'order_type')}
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
              onChange={(e) => this.handleTextFieldChange(e, 'img_link')}
              type="url"
            />
            <textarea
              className="journal-textarea"
              placeholder="Errors made"
              onChange={(e) => this.handleTextFieldChange(e, 'errors')}
            />
            <textarea
              className="journal-textarea"
              placeholder="Comments"
              onChange={(e) => this.handleTextFieldChange(e, 'comments')}
            />
            <div className="pips-gain-lost-container">
              <select
                className="pips-gain-lost-sign"
                onChange={(e) => this.handlePipsChance(e, true)}
              >
                <option selected="true" value="+">
                  +
                </option>
                <option value="-">-</option>
              </select>
              <input
                type="number"
                placeholder="Pips gain/lost"
                className="pips-gain-lost-input"
                onChange={(e) => this.handlePipsChance(e)}
              />
            </div>
            <button onClick={this.performAPICall} className="journal-btn">
              Create Journal
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateJournal;
