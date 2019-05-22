import React from 'react';
import {Row, Col, Button, Icon} from 'antd';
import {Link} from 'react-router-dom';
import './styles/SearchResult.css'

class SearchResult extends React.Component{
  render(){
    if(this.props.loading === true){
      return (
        <Button shape="circle" loading className="btn-loading"/>
      )
    }
    return(
      <Row className="search-result">
        <Col xs={4} md={2}>
          {
            this.props.user.avatar_url && <img src={this.props.user.avatar_url} alt="Avatar"/>
          }
        </Col>
        <Col xs={20} md={22}>
          <Row>
            <Col>
              <Link to='/user-profile'>{this.props.user.login}</Link>
            </Col>
            <Col>
              {this.props.user.name}
            </Col>
            <Col>
              {this.props.user.bio}
            </Col>
            <Col>
              {
                this.props.user.location && <Icon type="environment" />
              } 
              {this.props.user.location}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
}

export default SearchResult;