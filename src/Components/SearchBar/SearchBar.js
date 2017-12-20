import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{
  constructor(props){
    super(props)
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event){
    this.setState({term: event.target.value});
}
  search(event){
    event.preventDefault();
    this.props.onSearch(this.state.term);
  }

  render(){
    return (
      <form onSubmit={this.search} className="SearchBar">
          <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button type="submit">SEARCH</button>
      </form>
    );
  }
}
export default SearchBar;
