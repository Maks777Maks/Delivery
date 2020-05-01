import React, { Component } from 'react';
class ChangePasswordPage extends Component {
    state = { 
        id : "" 
    }

    componentDidMount(){
        let tmp = this.props.match.params.id;
        let id = tmp.split("=").splice(1,1).toString();
        this.setState({id:id});
    }

    render() {
        const {id} = this.state; 
    return ( <div>Hello {id}!</div> );
    }
}
 
export default ChangePasswordPage;