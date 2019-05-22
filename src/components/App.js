import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SearchResult from '../pages/SearchResult';
import UserProfile from '../pages/UserProfile';
import Layout from './Layout';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: undefined,
      login: undefined,
      user: {},
      loading: false,
      error: null,
    }
  }
  
  handleChange = (value, option) => {
    // console.log(option);
    this.setState({
      value: value,
      login: option.props.children,
    });
  }

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });

    try{
      const response = await fetch(`https://api.github.com/users/${this.state.login}`);
      const user = await response.json();
      this.setState({
        loading: false,
        user: user,
      });
    } catch(error){
      this.setState({
        loading: false,
        error: error,
      });
    }
  }
  
  render(){
    return (
      <BrowserRouter>
        <Layout onChange={this.handleChange} value={this.state.value} onClick={this.fetchData}>
        {/* <SearchResult value={this.state.value} login={this.state.login} user={this.state.user} /> */}
          <Switch>
            <Route exact path="/search-result" render={(props) => (
              <SearchResult value={this.state.value} login={this.state.login} user={this.state.user} {...props} /> )} 
            />
            <Route exact path="/user-profile" render={(props) => (
              <UserProfile value={this.state.value} login={this.state.login} user={this.state.user} {...props} /> )}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;