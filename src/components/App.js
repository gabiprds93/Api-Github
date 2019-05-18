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
    }
  }
  
  handleChange = (value, option) => {
    // console.log(option);
    this.setState({
      value: value,
      login: option.props.children,
    })
  }
  
  render(){
    return (
      <BrowserRouter>
        <Layout onChange={this.handleChange} value={this.state.value}>
          <Switch>
            <Route exact path="/search-result" render={(props) => (
              <SearchResult value={this.state.value} login={this.state.login} {...props} /> )} 
            />
            <Route exact path="/user-profile" component={UserProfile} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;