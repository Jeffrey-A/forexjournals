import React from "react";
import StrategyCard from "../components/StrategyCard";
import CreateStrategy from "../components/CreateStrategy";

class Strategies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      strategies: [],
    };

    this.deleteStrategy = this.deleteStrategy.bind(this);
  }

  componentDidMount() {
    this.getStrategies();
  }

  getStrategies() {
    const { user } = this.props;
    fetch(`/strategies/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ strategies: data });
      });
  }

  deleteStrategy(strategy_id) {
    fetch(`/strategies/${this.props.user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ strategy_id }),
    }).then((response) => {
      if (response.status == 200) {
        this.getStrategies();
      } else {
        console.log("failed");
      }
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
            <CreateStrategy user={this.props.user} />
          </div>
        </div>

        <div className="strategies-container">
          {strategies.map((strategy) => (
            <StrategyCard
              deleteStrategy={this.deleteStrategy}
              strategyInfo={strategy}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Strategies;
