import React from 'react';
import nextId from 'react-id-generator';
import CheckBox from '../components/elements/CheckBox';

const journalTableColumns = [
  'Pair',
  'Order',
  'Pips +/-',
  'Grapth Image',
  'Errors',
  'Extra Comments',
];

const checkAllName = 'checked-all';

class ViewJournal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      journals: [],
      checkedAll: false,
      checkedItems: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    fetch('/dev_data')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ journals: data.data });
      });
  }

  delete() {
    const { checkedAll, checkedItems, journals } = this.state;

    if (checkedAll) {
      console.log(journals.map((journal) => journal.journal_id));
    } else {
      const keys = Object.keys(checkedItems);
      const itemsToDelete = [];

      keys.forEach((journalId) => {
        if (checkedItems[journalId]) {
          itemsToDelete.push(journalId);
        }
      });

      console.log(itemsToDelete);
    }
  }

  handleChange(event) {
    const checkbox = event.target.name;
    const isChecked = event.target.checked;
    const checkedAll = isChecked && checkbox === checkAllName;
    const unCheckedAll =
      (!checkedAll && checkbox === checkAllName) || checkedAll;

    this.setState((preState) => {
      let updatedCheckedItems = {
        checkedItems: Object.assign(preState.checkedItems, {
          [checkbox]: isChecked,
        }),
        checkedAll,
      };

      if (unCheckedAll) {
        updatedCheckedItems = { checkedItems: {}, checkedAll };
      }

      return updatedCheckedItems;
    });
  }

  displayColumns() {
    const { checkedAll } = this.state;

    return journalTableColumns.map((columnName, index) => {
      return (
        <th className="journal-head-cell">
          {index === 0 ? (
            <CheckBox
              name={checkAllName}
              handleChange={this.handleChange}
              checked={checkedAll}
            />
          ) : null}
          {columnName}
        </th>
      );
    });
  }

  displayRows() {
    const { journals, checkedAll, checkedItems } = this.state;
    return journals.map((journal) => {
      const checkBoxName = journal.journal_id;
      return (
        <tr className="journal-body-row" key={nextId()}>
          <td className="journal-body-cell">
            <CheckBox
              name={checkBoxName}
              handleChange={this.handleChange}
              checked={checkedAll || checkedItems[checkBoxName]}
            />
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
          <div>
            <button onClick={this.delete} className="journal-btn">
              Delete
            </button>
            <button className="journal-btn">Add Entry</button>
          </div>
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
