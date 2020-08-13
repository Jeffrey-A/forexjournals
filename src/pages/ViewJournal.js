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
      return <th className="journal-head-cell">{columnName}</th>;
    });
  }

  displayRows() {
    const { journals } = this.state;
    return journals.map((journal) => {
      return (
        <tr className="journal-body-row">
          <input type="checkbox" />
          <td className="journal-body-cell">{journal.pair}</td>
          <td className="journal-body-cell">{journal.order_type}</td>
          <td className="journal-body-cell">{journal.pips_gained_lost}</td>
          <td className="journal-body-cell">{journal.img_link}</td>
          <td className="journal-body-cell">{journal.errors}</td>
          <td className="journal-body-cell">{journal.comments}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="journal-header-container">
          <h3>Strategy Name</h3>
        </div>
        <table className="journal-table">
          <thead className="journal-table-head-container">
            <tr className="journal-head-row">
              <input type="checkbox" />
              {this.displayColumns()}
            </tr>
          </thead>

          <tbody className="journal-table-body-container">
            {this.displayRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewJournal;
