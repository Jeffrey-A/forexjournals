import React from "react";
import StrategyCard from "../components/StrategyCard";

class Strategies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      strategies: [],
    };
  }

  componentDidMount() {
    const { user } = this.props;
    fetch(`/strategies/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ strategies: data });
      });
  }

  render() {
    const { strategies } = this.state;

    return (
      <div>
        <h1>Strategies</h1>
        <div className="strategies-container">
          {strategies.map((strategy) => (
            <StrategyCard name={strategy.name} />
          ))}
        </div>
      </div>
    );
  }
}

export default Strategies;
