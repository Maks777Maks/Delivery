import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { Button, Card, CardBody, CardGroup,
//          Col, Container, Form, Input, InputGroup,
//          InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as getListActions from './reducer';
// import InputMask from 'react-input-mask';
import get from "lodash.get";

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBIcon,
    MDBCardHeader,
    MDBBtn,
    MDBInput
  } from "mdbreact";

class ChangePasswordPage extends Component {
    state = { 
        id : "",
        password: "",
        confirmPassword: "",
        iconInput: 'eye-slash',
        typeInput: 'password',
        errors: {},
        // done: false,
        isLoading: false,
        // errorsServer: {}
    }

    mouseEnter = () => {
        this.setState({
          iconInput: 'eye',
          typeInput: 'text'
        });
      };
    
      mouseLeave = () => {
        this.setState({
          iconInput: 'eye-slash',
          typeInput: 'password'
        });
      };
    
    //   static getDerivedStateFromProps(nextProps, prevState) {
    //     return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
    // }
    
      setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
          let errors = Object.assign({}, this.state.errors);
          delete errors[name];
          this.setState(
            {
              [name]: value,
              errors
            }
          )
        }
        else {
          this.setState(
            { [name]: value })
        }
      }
    
      handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    
      }
    
      onSubmitForm = (e) => {
        e.preventDefault();
        const { password, confirmPassword, id } = this.state;
        console.log("onSubmitForm", this.state);    
        let errors = {};
    
        if (password === '') errors.password = "Поле є обов'язковим";
    
        if (confirmPassword === '') errors.confirmPassword = "Поле є обов'язковим";

        if(password !== confirmPassword) errors.passwordsNotMatched = "Значення полів повинні збігатися"
    
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
          this.setState({ isLoading: true });
          const model = {
            id: id,
            newPassword: password
            };
    
          this.props.ChangePassword(model);     
        }
        else {
          this.setState({ errors });
        }
      }

    componentDidMount(){
        let tmp = this.props.match.params.id;
        let id = tmp.split("=").splice(1,1).toString();
        this.setState({id:id});
    }

    render() {
        const {errors, typeInput, iconInput} = this.state;

    const form = (
        <MDBContainer >
  <MDBRow style={{height: '100vh' }} className="justify-content-center align-items-center">
    <MDBCol md="5">
      <form onSubmit={this.onSubmitForm}>
      {!!errors.passwordsNotMatched ?
     <div className="alert alert-danger">
      {errors.passwordsNotMatched}.
    </div> : ""} 
        <p className="h5 text-center mb-4">Змінити пароль</p>
        <div className="grey-text">
          <MDBInput label="Пароль" 
          validate
          id="password"
          name="password"
                type={typeInput}
                icon={iconInput}
                onIconMouseEnter={this.mouseEnter}
                onIconMouseLeave={this.mouseLeave}
                onChange={this.handleChange}/>
                {!!errors.password ?
     <div className="alert alert-danger">
      {errors.password}.
    </div> : ""}    
              <MDBInput
                label='Підтвердіть пароль'
                validate
                id="confirmPassword"
                name="confirmPassword"
                type={typeInput}
                icon={iconInput}
                onIconMouseEnter={this.mouseEnter}
                onIconMouseLeave={this.mouseLeave}
                onChange={this.handleChange}
              />
                 {!!errors.confirmPassword ?
     <div className="alert alert-danger">
      {errors.confirmPassword}.
    </div> : ""}
        </div>
        <div className="text-center">
            {/* <Redirect to=""></Redirect> */}
          <MDBBtn type="submit" color='primary'>Перейти до входу</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
    )
    return(
        form
    )
    }
}
 
function mapStateToProps(state) {
    return {
      loading: get(state, 'changePassword.post.loading'),
      failed: get(state, 'changePassword.post.failed'),
      success: get(state, 'changePassword.post.success'),
      errors: get(state, 'changePassword.post.errors')
    }
  }
  
  const mapDispatch = {
    ChangePassword: (model) => {
        return getListActions.ChangePassword(model);
    }
  }
  
  export default connect(mapStateToProps, mapDispatch)(ChangePasswordPage);