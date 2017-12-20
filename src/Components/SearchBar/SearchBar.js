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
  search(){
    this.props.onSearch(this.state.term)
  }

    render(){
      return (
        <div className="SearchBar">
        <form onSubmit={this.search}>
          <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
          <button type="submit">SEARCH</button>
        </form>
      </div>
      );
    }
}
export default SearchBar;
