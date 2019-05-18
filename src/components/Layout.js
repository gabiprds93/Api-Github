import React from 'react';
import SearchInput from '../components/SearchInput';

class Layout extends React.Component {
    render(){
        return (
            <React.Fragment>
                <SearchInput placeholder="input search text" style={{ width: 200 }} onChange={this.props.onChange} value={this.props.value}/>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default Layout;