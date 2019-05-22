import React from 'react';
import {HashRouter , Switch, Route} from 'react-router-dom';
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
      <HashRouter >
        <Layout onChange={this.handleChange} value={this.state.value} onClick={this.fetchData}>
          <Switch>
            <Route exact path="/search-result" render={(props) => (
              <SearchResult 
                user={this.state.user} 
                loading={this.state.loading} 
                {...props} /> )} 
            />
            <Route exact path="/user-profile" render={(props) => (
              <UserProfile 
                user={this.state.user} 
                {...props} /> )}
            />
          </Switch>
        </Layout>
      </HashRouter >
    );
  }
}

export default App;