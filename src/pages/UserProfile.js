import React, { Component } from 'react';
import { Row, Col, Badge } from 'antd';
import './styles/UserProfile.css';

class UserProfile extends React.Component{
    render(){
        return(
            <Row className='user-profile'>
                <Col xs={8} md={6}>
                    <img src={this.props.user.avatar_url}/>
                </Col>
                <Col span={12}>
                    Repositories 
                    <Badge
                        count={this.props.user.public_repos}
                        style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                    />
                </Col>
            </Row>
        );
    };
}

export default UserProfile;