import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
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
import {Modal} from 'react-bootstrap'


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


class ForgotPasswordPage extends Component {

  state = {
    email: '',
    profileUrl: '',
    errors: {},
    done: false,
    isLoading: false,
    errorsServer: ''
  }

  static getDerivedStateFromProps(nextProps) {
    return { isLoading: nextProps.loading, errorsServer: nextProps.errorsServer, done: nextProps.success };
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
    const { email } = this.state;
    console.log("onSubmitForm", this.state);

    let errors = {};

    if (email === '') 
      errors.email = "Поле є обов'язковим";

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      this.setState({ isLoading: true });
      const model = {
        email: email,
        };

      this.props.ForgotPassword(model);     
    }
    else {
      this.setState({ errors });
    }
  }

  render() {
    const { errors, errorsServer, done } = this.state;
    const modalForm = (<Container>
      <Row style={{height: '100vh'}} className="justify-content-center align-items-center">
        <Col md="5">
          <Form onSubmit={this.onSubmitForm} className="form" style={styles}>
          <p>Для зміни паролю перейдіть за посиланням у листі, який ми вам відправили на вказану електронну адресу</p>
          <Button color='secondary'>          
            <Link to="/login" style={{color: "white", textDecoration: "none"}}>Повернутись до входу</Link>
          </Button>
          </Form>
    </Col>
  </Row>
</Container>)
    const form = (done ? modalForm:
<Container>
  <Row style={{height: '100vh'}} className="justify-content-center align-items-center">
    <Col md="5">
      <Form onSubmit={this.onSubmitForm} className="form" style={styles}>
        <p className="h4 text-center mb-4">Відправити лист для відновлення паролю</p>
        {!!errorsServer ?
     <div className="errorMessage" style={styles}>
      {errorsServer}.
    </div> : ""} 
        <div className="grey-text">
          <MDBInput label="Електронна пошта" 
          icon="envelope" 
          group type="email" 
          validate error="wrong"
            success="right" 
            id="email"
            name="email"
            onChange={this.handleChange}/>      
               {!!errors.email ?
     <div className="errorMessage" style={styles}>
      - {errors.email}.
    </div> : ""}   
        </div>
        <div className="text-center">
          <Button color='secondary'>          
            <Link to="/login" style={{color: "white", textDecoration: "none"}}>Повернутись до входу</Link>
          </Button>
          <Button type="submit" color='primary'>Відправити</Button>
        </div>
      </Form>
    </Col>
  </Row>
</Container>
    );
    return (
       form
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: get(state, 'forgotPassword.post.loading'),
    failed: get(state, 'forgotPassword.post.failed'),
    success: get(state, 'forgotPassword.post.success'),
    errorsServer: get(state, 'forgotPassword.post.errors')
  }
}

const mapDispatch = {
  ForgotPassword: (model) => {
      return getListActions.ForgotPassword(model);
  }
}

export default connect(mapStateToProps, mapDispatch)(ForgotPasswordPage);
