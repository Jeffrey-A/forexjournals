import React from "react";
import StrategyCard from "../components/StrategyCard";
import CreateStrategy from "../components/CreateStrategy";

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
      <div className="container">
        <div className="strategies-header-container">
          <div>
            <h1>Strategies</h1>
          </div>

          <div>
            <CreateStrategy />
          </div>
        </div>

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
