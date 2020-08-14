import React from 'react';
import nextId from 'react-id-generator';

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
    return journalTableColumns.map((columnName, index) => {
      return (
        <th className="journal-head-cell">
          {index === 0 ? (
            <input className="journal-checkbox" type="checkbox" />
          ) : null}
          {columnName}
        </th>
      );
    });
  }

  displayRows() {
    const { journals } = this.state;
    return journals.map((journal) => {
      const checkbox = <input className="journal-checkbox" type="checkbox" />;
      return (
        <tr className="journal-body-row" key={nextId()}>
          <td className="journal-body-cell">
            {checkbox}
            {journal.pair}
          </td>
          <td className="journal-body-cell">{journal.order_type}</td>
          <td className="journal-body-cell">{journal.pips_gained_lost}</td>
          <td className="journal-body-cell">{journal.img_link}</td>
          <td className="journal-body-cell large-cell-container">
            <div className="journal-cell-large">{journal.errors}</div>
          </td>
          <td className="journal-body-cell large-cell-container">
            <div className="journal-cell-large">{journal.comments}</div>
          </td>
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
            <tr className="journal-head-row">{this.displayColumns()}</tr>
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
