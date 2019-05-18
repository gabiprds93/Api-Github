import React, { Component } from 'react';

import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';

const Option = Select.Option;

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
    jsonp(`https://api.github.com/search/users?${str}`)
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

class SearchInput extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      data: [],
      // value: undefined,
    };
  }

  handleSelect = (value, option) => {
    console.log("value", value);
    console.log("option", option);
  }
  
  handleSearch = value => {
    fetch(value, data => this.setState({ data }));
  };

  // handleChange = value => {
  //   this.setState({ value });
  // };

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <Select
        showSearch
        value={this.props.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        // onSelect={this.handleSelect}
        onSearch={this.handleSearch}
        onChange={this.props.onChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  }
}

export default SearchInput;