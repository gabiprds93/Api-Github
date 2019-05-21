import React from 'react';
import {Button} from 'antd'

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
            <div>
              {this.props.user.name}
            {this.props.value} - {this.props.login}
            </div>
            
        );
    };
}

export default SearchResult;