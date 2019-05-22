import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Select, Button } from 'antd';
import './styles/SearchInput.css';

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
    };
  }
  
  handleSearch = value => {
    fetch(value, data => this.setState({ data }));
  };

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <React.Fragment>
        <Row>
          <Col xs={{span:24, offset:0}} md={{span:12, offset:6}} className="search-bar">
            <Link to='/'>
              <Icon type="github" />
            </Link>
            <Select
              showSearch
              value={this.props.value}
              placeholder={this.props.placeholder}
              style={this.props.style}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleSearch}
              onChange={this.props.onChange}
              notFoundContent={null}
            >
              {options}
            </Select>
            <Link to='/search-result'>
              <Button shape="circle" onClick={this.props.onClick}><Icon type="search" /></Button>
            </Link>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default SearchInput;