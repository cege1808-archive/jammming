import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: '',
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleTermChange(event){
    const term = event.target.value;
    this.setState({term: term});
  }
  handleSearch(event){
    event.preventDefault();
    const term = this.state.term;
    this.props.onSearch(term);
  }
  render(){
    return (
      <div className="SearchBar">
        <input placeholder='Enter Song Title' onChange={this.handleTermChange} />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;