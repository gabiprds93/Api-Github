import React from 'react';
import { Row, Col, Badge, Icon } from 'antd';
import './styles/UserProfile.css';

class UserProfile extends React.Component{
    render(){
        return(
            <Row className='user-profile'>
                <Col xs={8} md={6}>
                    <Row>
                        <Col>
                        {
                            this.props.user.avatar_url && <img src={this.props.user.avatar_url} alt="Avatar"/>
                        }
                        </Col>
                        <Col>
                            <h1>{this.props.user.name}</h1>
                            <p>{this.props.user.login}</p>
                        </Col>
                        <Col>
                            <span>{this.props.user.bio}</span>
                        </Col>
                        {
                            this.props.user.company &&
                            <Col>
                                <Icon type="user" /> <span>{this.props.user.company}</span>
                            </Col>
                        }
                        {
                            this.props.user.location &&
                            <Col>
                                <Icon type="environment" /> <span>{this.props.user.location}</span>
                            </Col>
                        }
                        {
                            this.props.user.blog &&
                            <Col>
                                <Icon type="link" /> <span>{this.props.user.blog}</span>
                            </Col>
                        }
                    </Row>
                </Col>

                <Col xs={16} md={18}>
                    <Row>
                        {
                            this.props.user.public_repos !== undefined && 
                            <Col>
                                <span>Repositories</span>
                                <Badge
                                    count={this.props.user.public_repos}
                                    showZero={true}
                                    style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                                />
                            </Col>
                        }
                        {
                            this.props.user.followers !== undefined &&
                            <Col xs={16} md={18}>
                                <span>Followers</span>
                                <Badge
                                    count={this.props.user.followers}
                                    showZero={true}
                                    style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                                />
                            </Col>
                        }
                        {
                            this.props.user.following !== undefined &&
                            <Col xs={16} md={18}>
                                <span>Following</span>
                                <Badge
                                    count={this.props.user.following}
                                    showZero={true}
                                    style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                                />
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
        );
    };
}

export default UserProfile;