import React from "react";
import nextId from "react-id-generator";

class Tagger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      suggestions: this.props.suggestions,
      selectedOptions: [],
    };
    this.displaySuggestions = this.displaySuggestions.bind(this);
    this.hideSuggestions = this.hideSuggestions.bind(this);
    this.displaySelectedOptions = this.displaySelectedOptions.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.removeOptionFromTagger = this.removeOptionFromTagger.bind(this);
  }

  componentDidMount() {
    document.removeEventListener("click", () => {});

    document.addEventListener("click", (e) => {
      const shouldHideSuggestions =
        e.target.tagName.toLowerCase() !== "input" ||
        e.target.placeholder !== this.props.placeholder;
      if (shouldHideSuggestions) {
        this.hideSuggestions();
      }
    });
  }

  displaySuggestions(e) {
    e.stopPropagation();
    this.setState({ isActive: true });
  }

  displaySelectedOptions() {
    const { selectedOptions } = this.state;
    const listItems = selectedOptions.map((option) => (
      <li className="tagger-selected-option" key={nextId()}>
        <span>{option}</span>
        <span
          className="tagger-remove-btn"
          onClick={this.removeOptionFromTagger}
        >
          X
        </span>
      </li>
    ));
    return listItems;
  }

  selectOption(e) {
    console.log(e.target);
    this.setState({
      selectedOptions: [...this.state.selectedOptions, e.target.textContent],
      isActive: false,
    });
  }

  hideSuggestions() {
    this.setState({ isActive: false });
  }

  removeOptionFromTagger(e) {
    e.stopPropagation();
    const option = e.target.previousSibling.textContent;
    const { selectedOptions } = this.state;
    this.setState({
      selectedOptions: selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      ),
    });
  }

  render() {
    const { placeholder } = this.props;
    return (
      <div className="tagger-top-container">
        <div>
          <div className="tagger-container">
            <input
              // onBlur={this.hideSuggestions}
              onClick={this.displaySuggestions}
              className="tagger-input"
              placeholder={placeholder}
            />
            <button className="tagger-add-btn">Add</button>
          </div>
          <ul className="tagger-suggestions-ul">
            {this.state.isActive
              ? this.state.suggestions.map((content) => (
                  <l1
                    className="tagger-suggestion-li"
                    onClick={this.selectOption}
                    key={nextId()}
                  >
                    {content}
                  </l1>
                ))
              : null}
          </ul>
          <ul>{this.displaySelectedOptions()}</ul>
        </div>
      </div>
    );
  }
}

export default Tagger;
