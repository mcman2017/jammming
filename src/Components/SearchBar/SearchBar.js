import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
   constructor(props){
    super(props);
    this.state = { searchTerm: "" }
    this.search =  this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
}

  search () {
     console.log(`We are in sb with ${this.state.searchTerm}`);
     this.props.onSearch(this.state.searchTerm);
}

   handleTermChange(event) {
     this.setState( { searchTerm: event.target.value } );
     console.log(`HeRe and setting state to ${event.target.value}`);
}

handleKeyPress(event) {
    if(event.charCode===13){
        console.log(`We are in hkb with ${this.state.searchTerm}`);        
        this.search();
    }

} 

  render() {
    return (
<div className="SearchBar">
  <input placeholder="Enter A Song, Album, or Artist" 
         onChange={this.handleTermChange}
         onKeyPress={this.handleKeyPress} />
  <a onClick = {this.search} >SEARCH</a>
</div>
    );
  }
}

export default SearchBar;
