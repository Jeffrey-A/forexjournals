import React from 'react';
import StrategyCard from '../components/StrategyCard';
import CreateStrategy from '../components/CreateStrategy';

class Strategies extends React.Component {

  componentDidMount() {
    this.props.getAllStrategies()
  }

  render() {
    const { user, strategies, createStrategy, deleteStrategy } = this.props;

    return (
      <div className="container">
        <div className="strategies-header-container">
          <div>
            <h1>Strategies</h1>
          </div>

          <div>
            <CreateStrategy createStrategy={createStrategy} user={user} />
          </div>
        </div>

        <div className="strategies-container">
          {strategies.map((strategy) => (
            <StrategyCard
              deleteStrategy={deleteStrategy}
              strategyInfo={strategy}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Strategies;
