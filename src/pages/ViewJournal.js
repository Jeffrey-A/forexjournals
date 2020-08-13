import React from 'react';

const journalTableColumns = [
  'Pair',
  'Order',
  'Pips +/-',
  'Grapth Image',
  'Errors',
  'Extra Comments',
];

class ViewJournal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { journals: [] };
  }

  componentDidMount() {
    fetch('/dev_data')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ journals: data.data });
      });
  }

  displayColumns() {
    return journalTableColumns.map((columnName) => {
      return <th>{columnName}</th>;
    });
  }

  displayRows() {
    const { journals } = this.state;
    return journals.map((journal) => {
      return (
        <tr>
          <input type="checkbox" />
          <td>{journal.pair}</td>
          <td>{journal.order_type}</td>
          <td>{journal.pips_gained_lost}</td>
          <td>{journal.img_link}</td>
          <td>{journal.errors}</td>
          <td>{journal.comments}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          <h3>Strategy Name</h3>
        </div>
        <table>
          <thead>
            <tr>
              <input type="checkbox" />
              {this.displayColumns()}
            </tr>
          </thead>

          <tbody>{this.displayRows()}</tbody>
        </table>
      </div>
    );
  }
}

export default ViewJournal;
