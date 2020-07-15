import React from "react";

class ViewStrategy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      description,
      entry_conditions,
      exit_conditions,
      time_frames,
      indicators,
      indicators_suggestions,
      time_frames_suggestions,
    } = this.props;

    return (
      <div className='container'>
        <h1>Strategy name here</h1>
      </div>
    );
  }
}
export default ViewStrategy;
