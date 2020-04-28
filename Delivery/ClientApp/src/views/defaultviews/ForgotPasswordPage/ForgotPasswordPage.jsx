import React, { Component } from 'react';
import { connect } from "react-redux";
import * as getListActions from './reducer';
// import InputMask from 'react-input-mask';
import get from "lodash.get";

import {
    MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput
  } from "mdbreact";

class ForgotPasswordPage extends Component {

  state = {
    email: '',
    profileUrl: '',
    errors: {},
    done: false,
    isLoading: false,
    errorsServer: {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
  
    return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
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
    const form = (
<MDBContainer >
  <MDBRow style={{height: '100vh' }} className="justify-content-center align-items-center">
    <MDBCol md="5">
      <form onSubmit={this.onSubmitForm}>
        <p className="h5 text-center mb-4">Відправити лист для відновлення паролю</p>
        <div className="grey-text">
          <MDBInput label="Електронна пошта" 
          icon="envelope" 
          group type="email" 
          validate error="wrong"
            success="right" 
            id="email"
            name="email"
            onChange={this.handleChange}/>         
        </div>
        <div className="text-center">
          <MDBBtn type="submit" color='primary'>Відправити</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
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
    errors: get(state, 'forgotPassword.post.errors')
  }
}

const mapDispatch = {
  ForgotPassword: (model) => {
      return getListActions.ForgotPassword(model);
  }
}

export default connect(mapStateToProps, mapDispatch)(ForgotPasswordPage);
