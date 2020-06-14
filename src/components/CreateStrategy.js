import React from "react";

class CreateStrategy extends React.Component {
  constructor(props) {
    super(props);
  }

  closeModal() {}

  render() {
    return (
      <div>
        <div className='modal-overlay'></div>
        <div className='modal-container'>
          <h1>Create Strategy</h1>
          <button>X</button>
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
