import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as loginActions from './reducer';
// import InputMask from 'react-input-mask';
import get from "lodash.get";
import {
    FormHelperText
  } from '@material-ui/core';

import {
    MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput
} from "mdbreact";


function LoadErrors(err){
    if(typeof err!='object'){
      return(
      <FormHelperText error>{err}</FormHelperText>
      )
    }
  }


class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        profileUrl: '',
        errors: {},
        done: false,
        isLoading: false,
        errorsServer: '',
        iconInput: 'eye-slash',
        typeInput: 'password',
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
        const { email, password } = this.state;
        console.log("onSubmitForm", this.state);
        //const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)?([0-9]{3})-?([0-9]{2})-?([0-9]{2})).{17}$/;
        const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/;

        let errors = {};
        if (!regex_password.test(password)) errors.password = "Пароль повинен мати мінімум 6 символів на латиниці, нижній і верхній регістр, та цифри!";
        if (email === '') errors.email = "Поле є обов'язковим";
        //if (!regex_phone.test(phone)) errors.phone = "Не вiрний формат +xx(xxx)xxx-xx-xx телефону";

        if (password === '') errors.password = "Поле є обов'язковим";

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({ isLoading: true });
            const model = {
                email: email,
                password: password
            };

            this.props.login(model, this.props.history);
        }
        else {
            this.setState({ errors });
        }
    }

    static getDerivedStateFromProps(nextProps) {
        console.log("Static",nextProps);
        return { isLoading: nextProps.loading, errorsServer: nextProps.errorsServer};
    }

    render() {
        const { iconInput, typeInput, errorsServer, errors } = this.state;
        console.log("RENDER", errors);
        const form = (
            <MDBContainer>
                <MDBRow style={{ height: '100vh' }} className="justify-content-center align-items-center">
                    <MDBCol md="5">
                        <form onSubmit={this.onSubmitForm}>
                            <p className="h5 text-center mb-4">Увійти</p>
                            {LoadErrors(errorsServer)}
                            <div className="grey-text">
                                <MDBInput label="Електронна пошта"
                                    icon="envelope"
                                    group type="email"
                                    validate error="wrong"
                                    success="right"
                                    id="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    autoComplete="new-password" />
                                <MDBInput
                                    label='Пароль'
                                    validate
                                    id="password"
                                    name="password"
                                    type={typeInput}
                                    icon={iconInput}
                                    onIconMouseEnter={this.mouseEnter}
                                    onIconMouseLeave={this.mouseLeave}
                                    onChange={this.handleChange}
                                    autoComplete="new-password"
                                />
                                {!!errors.password ? <div>{errors.password}</div> : ""}
                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit" color='primary'>Вхід</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>);
        return (
            form
        );
    }
}

LoginPage.propTypes =
    {
        login: PropTypes.func.isRequired
    }

function mapStateToProps(state) {
    return {
        loading: get(state, 'login.post.loading'),
        failed: get(state, 'login.post.failed'),
        success: get(state, 'login.post.success'),
        errorsServer: get(state, 'login.post.errors')
    }
}

const mapDispatch = {
    login: (model, history) => {
        return loginActions.login(model, history);
    }
}

export default connect(mapStateToProps, mapDispatch)(LoginPage);
