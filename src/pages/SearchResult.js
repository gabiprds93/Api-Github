import React from 'react';

import jsonp from 'fetch-jsonp';
import querystring from 'querystring';

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      // code: 'utf-8',
      q: value,
    });
    jsonp(`https://api.github.com/users/value`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          let result = [];
          if(d.data.items !== undefined){
            result = d.data.items;
          }
          const data = [];
          result.forEach(r => {
            data.push({
              value: r.id,
              text: r.login,
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

class SearchResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: undefined,
        }
    }
    handleChange = value =>{
        console.log(this.props.login);
        // this.setState({text: this.props.option.props.children});
    }
    render(){
        return(
            <div>
            {this.props.value} - {this.props.login}
            </div>
            
        );
    };
}

export default SearchResult;