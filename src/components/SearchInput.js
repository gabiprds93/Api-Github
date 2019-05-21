import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Select, Button } from 'antd';
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

  // fetchData = async () => {
  //   this.setState({
  //     loading: true,
  //     error: null,
  //   });

  //   try{
  //     const response = await fetch(`https://api.github.com/users/${this.props.value}`);
  //     const data = await response.json();
  //     this.setState({
  //       loading: false,
  //       data: data,
  //     });
  //   } catch(error){
  //     this.setState({
  //       loading: false,
  //       error: error,
  //     });
  //   }
  // }

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <React.Fragment>
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
        {/* <Link to='/search-result'> */}
          <Button shape="circle" icon="search" onClick={this.props.onClick}></Button>
        {/* </Link> */}
      </React.Fragment>
    );
  }
}

export default SearchInput;