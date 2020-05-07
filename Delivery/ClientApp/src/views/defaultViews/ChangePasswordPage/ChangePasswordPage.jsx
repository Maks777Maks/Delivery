import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup,
         Col, Container, Form, Input, InputGroup,
         InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as getListActions from './reducer';
// import InputMask from 'react-input-mask';
import get from "lodash.get";
import styles from '../../../assets/css/authStyle.css'

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
        done: false,
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
    
      static getDerivedStateFromProps(nextProps) {
        return { isLoading: nextProps.loading,  done: nextProps.success};
    }
    
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
        const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/;
    
        if (password === '') errors.password = "Поле є обов'язковим";

        if(!regex_password.test(password)) errors.passNotMatchedRegex = "Пароль повинен містити мінімум 6 символів," +  
        "1 цифру, 1 велику букву, 1 малу букву і 1 спец. символ";
    
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
        const {errors, typeInput, iconInput, done} = this.state;
        const modalForm = (<Container>
          <Row style={{height: '100vh'}} className="justify-content-center align-items-center">
            <Col md="5">
              <Form onSubmit={this.onSubmitForm} className="form" style={styles}>
                <p>Вітаємо! Ви успішно змінили пароль.</p>
                <Button color='secondary'>          
                    <Link to="/login" style={{color: "white", textDecoration: "none"}}>Повернутись до входу</Link>
                </Button>
              </Form>
        </Col>
      </Row>
    </Container>)

    const form = (done ? modalForm :
        <Container >
  <Row style={{height: '100vh' }} className="justify-content-center align-items-center">
    <Col md="5">
      <Form onSubmit={this.onSubmitForm} className="form" style={styles}>
        <p className="h5 text-center mb-4">Змінити пароль</p>
        {!!errors.passNotMatchedRegex ?
     <div className="errorMessage" style={styles}>
      - {errors.passNotMatchedRegex}.
    </div> : ""}
    {!!errors.passwordsNotMatched ?
     <div className="errorMessage" style={styles}>
      - {errors.passwordsNotMatched}.
    </div> : ""} 
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
     <div className="errorMessage" style={styles}>
      - {errors.password}.
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
     <div className="errorMessage" style={styles}>
      - {errors.confirmPassword}.
    </div> : ""}
        </div>
        <div className="text-center">
          <Button type="submit" color='primary'>Змінити</Button>
        </div>
      </Form>
    </Col>
  </Row>
</Container>
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