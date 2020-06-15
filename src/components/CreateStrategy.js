import React from "react";

class CreateStrategy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({isShowingModal: !this.state.isShowingModal});
  }

  render() {
    const { isShowingModal } = this.state;

    if (!isShowingModal) {
      return <button onClick={this.toggleModal}>Create Strategy</button>;
    }

    return (
      <div>
        <div className="modal-overlay"></div>
        <div className="modal-container">
          <h1>Create Strategy</h1>
          <button onClick={this.toggleModal}>X</button>
          <div className="create-strategy-inputs-container">
            <input />
            <textarea></textarea>
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <textarea></textarea>
            <textarea></textarea>
            <input />
            <input />
            <button>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStrategy;
