import React, { Component } from 'react';
import * as getListActions from './reducer';
import {
    MDBMask, MDBView, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput
} from "mdbreact";
import { connect } from 'react-redux';
import get from "lodash.get";

import jwt from 'jsonwebtoken';

let user;
if(localStorage.jwtToken) {
    let data = {token: localStorage.jwtToken, refToken: localStorage.refreshToken};
    user = jwt.decode(data.token);
}

class ProfileManager extends Component {
    state = {
        name: 'client name',
        surname: 'client surname',
        phone: 'client phone',
        email: 'client email',
        password: 'password',
        birthDate: '2000-01-01',
        profileUrl: '',
        errors: {},
        done: false,
        isLoading: false,
        errorsServer: {},
        iconInput: 'eye-slash',
        typeInput: 'password'
    }
    componentDidMount = () => {
        console.log("INFO USER", user);
        if(user)
        {
            const model = { id: user.id };
            console.log("MODEL USER", model);
            this.props.getUserProfile(model);
        }
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

    setFormatDate = (date = new Date()) => {
        let dateJS = new Date();
        try {
            dateJS = new Date(date);
        }
        catch (ex) {
            console.error('setFormatDate', ex.message);
        }

        var dd = dateJS.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = dateJS.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = dateJS.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return yy + '-' + mm + '-' + dd;
    }

    handleChangeData = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    componentDidUpdate(prevProps) {
        // Популярный пример (не забудьте сравнить пропсы):
        if (this.props.userProfile.email !== prevProps.userProfile.email) {
            const { name, surname, email, phone, birthDate } = this.props.userProfile;
            this.setState({ name, surname, email, phone, birthDate: this.setFormatDate(birthDate) });
        }
    }

    render() {
        console.log("render works");
        const { typeInput, iconInput, name, surname, birthDate, phone, email } = this.state;

        return (
            <MDBContainer className="mt-5">
                <MDBRow className="mt-4">
                    <MDBCol md="5">
                        <h2 className="text-center">Profile</h2>
                        <MDBInput type="text" outline icon="user" label={name} autoComplete="new-password" />
                        <MDBInput type="text" outline icon="user" label={surname} autoComplete="new-password"/>
                        <MDBInput type="tel" outline icon="phone" label={phone}autoComplete="new-password" />
                        <MDBInput type="email" outline icon="envelope" label={email} autoComplete="new-password"/>
                        <MDBInput type="date" outline icon="birthday-cake" value={birthDate}
                            onChange={this.handleChangeData} autoComplete="new-password"
                            name="birthDate"/>

                        <MDBInput label="Password" outline validate id="password" name="password"
                            type={typeInput}
                            icon={iconInput}
                            onIconMouseEnter={this.mouseEnter}
                            onIconMouseLeave={this.mouseLeave}
                            onChange={this.handleChange}
                            autoComplete="new-password"
                        />
                    </MDBCol>
                    <MDBCol md="7">
                        <MDBView hover zoom>
                            <img
                                src="https://mdbootstrap.com/img/Others/documentation/img%20(131)-mini.jpg"
                                className="img-fluid rounded hoverable"
                                alt="Profile"
                            />
                            <MDBMask className="flex-center">
                                <MDBBtn onClick={() => { alert("Hello world") }} className="white-text">Change photo</MDBBtn>
                            </MDBMask>
                        </MDBView>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    };
}

const mapStateToProps = state => {
    return {
        userProfile: get(state, "userProfile.list.data")
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (model) => { dispatch(getListActions.getUserProfile(model)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileManager);