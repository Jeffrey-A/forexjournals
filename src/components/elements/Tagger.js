import React from "react";

class Tagger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      suggestions: this.props.suggestions,
    };
    this.displaySuggestions = this.displaySuggestions.bind(this);
    this.hideSuggestions = this.hideSuggestions.bind(this);
  }

  displaySuggestions() {
    const { suggestions } = this.props;
    const listItems = suggestions.map( content => {
        return <l1>{content}</l1>
    });
    console.log(listItems)
    this.setState({ suggestions: listItems, isActive: true});
  }

  hideSuggestions(){
      this.setState({isActive: false})
  }

  render() {
    const { placeholder } = this.props;
    return (
      <div className="tagger-top-container">
        <div>
          <div className="tagger-container">
            <input
              onBlur={this.hideSuggestions}
              onClick={this.displaySuggestions}
              className="tagger-input"
              placeholder={placeholder}
            />
            <button className="tagger-add-btn">Add</button>
          </div>
          <ul className='tagger-suggestions-ul'>{this.state.isActive ? this.state.suggestions : null }</ul>
        </div>
      </div>
    );
  }
}

export default Tagger;
