import React from "react";
import StrategyCard from "../components/StrategyCard";

const sampleStrategies = [
  "Strategy one",
  "Strategy two",
  "Strategy three",
  "Strategy four",
];

class Strategies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      strategies: sampleStrategies,
    };
  }

  componentDidMount() {
      // TODO: fetch strategies for the current user
  }

  render() {
    const { strategies } = this.state;

    return (
      <div>
        <h1>Strategies</h1>
        <div className="strategies-container">
          {strategies.map((strategy) => (
            <StrategyCard name={strategy} />
          ))}
        </div>
      </div>
    );
  }
}

export default Strategies;