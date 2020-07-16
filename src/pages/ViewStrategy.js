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
      <div className="container">
        <div>
          <h1>{name}</h1>
          <div>
            <p>Overview</p>
            <p>{description}</p>
          </div>

          <div>
            <p>Entry Conditions</p>
            <p>{entry_conditions}</p>
          </div>

          <div>
            <p>Exit Conditions</p>
            <p>{exit_conditions}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewStrategy;
