import React from 'react';
import {Row, Col, Button} from 'antd';
import {Link} from 'react-router-dom';
import './styles/SearchResult.css'

class SearchResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: null,
            data: undefined,                  
        }
    }
    handleChange = value =>{
        console.log(this.props.login);
        // this.setState({text: this.props.option.props.children});
    }
    
    // componentDidMount(){
    //   this.fetchData();
    // }

    // fetchData = async () => {
    //   this.setState({
    //     loading: true,
    //     error: null,
    //   });

    //   try{
    //     const response = await fetch(`https://api.github.com/users/${this.props.login}`);
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

    render(){
      if(this.props.loading === true){
        return (
          <Button shape="circle" loading />
        )
      }
        return(
            <Row className="search-result">
              <Col xs={4} md={2}>
                <img src={this.props.user.avatar_url}/>
              </Col>
              <Col xs={20} md={22}>
                <Row>
                  <Col xs={24}>
                    <Link to='/user-profile'>{this.props.user.login}</Link>
                  </Col>
                  <Col xs={24}>
                    {this.props.user.name}
                  </Col>
                  <Col span={24}>
                    {this.props.user.location}
                  </Col>
                </Row>
              </Col>
            </Row>
            
        );
    };
}

export default SearchResult;