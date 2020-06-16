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
      <div className='modal-main-container'>
        <div className="modal-overlay"></div>
        <span className='close-modal-btn' onClick={this.toggleModal}>X</span>
        <div className="modal-container">
          <h1 className='modal-header'>Create Strategy</h1>
          <div className="create-strategy-inputs-container">
            <input className='modal-input' placeholder='Name'/>
            <textarea className='modal-textarea' placeholder='Description'></textarea>
            <select>
              <option>Indicators</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <select>
              <option>Time frames</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            <textarea className='modal-textarea' placeholder='Entry conditions'></textarea>
            <textarea className='modal-textarea' placeholder='Exit conditions'></textarea>
            <input className='modal-input' placeholder='Risk per trade' />
            <input className='modal-input' placeholder='Risk to reward' />
            <button className='modal-create-btn'>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStrategy;
