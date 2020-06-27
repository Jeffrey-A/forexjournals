import React from "react";
import nextId from "react-id-generator";

class Tagger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      inputText: "",
    };

    this.hideSuggestions = this.hideSuggestions.bind(this);
    this.displaySelectedOptions = this.displaySelectedOptions.bind(this);
    this.removeOptionFromTagger = this.removeOptionFromTagger.bind(this);
    this.displaySuggestions = this.displaySuggestions.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.handleInputChangeAndUpdateSuggestions = this.handleInputChangeAndUpdateSuggestions.bind(
      this
    );
    this.appendSuggestionAndResetSuggestions = this.appendSuggestionAndResetSuggestions.bind(
      this
    );
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
  }

  componentDidMount() {
    // For some reason the event was binding twice.
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

  hideSuggestions() {
    this.setState({ isExpanded: false });
  }

  displaySelectedOptions() {
    const { selectedOptions } = this.props;
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

  removeOptionFromTagger(e) {
    e.stopPropagation();

    const option = e.target.previousSibling.textContent;
    const { selectedOptions } = this.props;
    const updatedSelections = selectedOptions.filter(
      (selectedOption) => selectedOption !== option
    );

    this.props.updateSelectedOptions(updatedSelections);
  }

  displaySuggestions(e) {
    e.stopPropagation();
    this.setState({ isExpanded: true });
  }

  selectOption(e) {
    const { selectedOptions } = this.props;
    const clickedOption = e.target.textContent;

    this.setState(
      {
        isExpanded: false,
      },
      () => {
        if (!selectedOptions.includes(clickedOption)) {
          this.props.updateSelectedOptions([...selectedOptions, clickedOption]);
        }
      }
    );
  }

  appendSuggestionAndResetSuggestions() {
    const { inputText } = this.state;
    const {
      selectedOptions,
      updateSelectedOptions,
      updateSuggestions,
      defaultSuggestions,
    } = this.props;

    if (inputText.length) {
      this.setState(
        {
          inputText: "",
          isExpanded: false,
        },
        () => {
          updateSelectedOptions([...selectedOptions, inputText]);
          updateSuggestions(defaultSuggestions);
        }
      );
    }
  }

  handleInputChangeAndUpdateSuggestions(e) {
    const inputValue = e.target.value;

    this.setState({ inputText: inputValue }, () => {
      const { defaultSuggestions, updateSuggestions } = this.props;
      const filteredSuggestions = defaultSuggestions.filter((suggestion) => {
        return suggestion.toLowerCase().includes(inputValue.toLowerCase());
      });

      if (inputValue != "") {
        updateSuggestions(filteredSuggestions);
      } else {
        updateSuggestions(defaultSuggestions);
      }
    });
  }

  handleInputKeyDown(e) {
    if (e.key === "Enter") {
      this.appendSuggestionAndResetSuggestions();
    }
  }

  render() {
    const { placeholder, suggestions } = this.props;
    const { inputText } = this.state;

    return (
      <div className="tagger-top-container">
        <div>
          <div className="tagger-container">
            <input
              value={inputText}
              onKeyDown={this.handleInputKeyDown}
              onChange={this.handleInputChangeAndUpdateSuggestions}
              onClick={this.displaySuggestions}
              className="tagger-input"
              placeholder={placeholder}
            />
            <button
              onClick={this.appendSuggestionAndResetSuggestions}
              className="tagger-add-btn"
            >
              Add
            </button>
          </div>
          <ul className="tagger-suggestions-ul">
            {this.state.isExpanded
              ? suggestions.map((content) => (
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
