import React from "react";

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
          <div>
              <select>
                  <option>Pair</option>
                  <option>EURUSD</option>
                  <option>USDCAD</option>
              </select>
              <select>
                  <option>Order type</option>
                  <option>Buy</option>
                  <option>Sell</option>
                  <option>Buy Stop</option>
                  <option>Sell Stop</option>
                  <option>Buy Limit</option>
                  <option>Sell Limit</option>
              </select>
              <input placeholder='chart link' type='url'/>
              <textarea placeholder='Errors made'></textarea>
              <textarea placeholder='Comments'></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateJournal;
