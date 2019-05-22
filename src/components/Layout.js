import React from 'react';
import SearchInput from '../components/SearchInput';

class Layout extends React.Component {
    render(){
        return (
            <React.Fragment>
                <SearchInput 
                    placeholder="input search text"
                    onChange={this.props.onChange} 
                    value={this.props.value} 
                    onClick={this.props.onClick}
                />
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default Layout;