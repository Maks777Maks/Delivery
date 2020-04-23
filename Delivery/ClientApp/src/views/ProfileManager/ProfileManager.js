import React, { Component } from 'react';
import * as getListActions from './reducer';
import {
    MDBMask, MDBView, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput
} from "mdbreact";
import { connect } from 'react-redux';
import get from "lodash.get";

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
        this.props.getUserProfile();
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

    handleChangeDate(event) {
        this.setState({ birthDate: event.target.value })
    }

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
                        <MDBInput type="text" outline icon="user" label={name} />
                        <MDBInput type="text" outline icon="some" label={surname} />
                        <MDBInput type="tel" outline icon="phone" label={phone} />
                        <MDBInput type="email" outline icon="envelope" label={email} />
                        <MDBInput type="date" outline icon="birthday-cake" value={birthDate}
                            onChange={this.handleChangeDate.bind(this)} />

                        <MDBInput label="Password" outline validate id="password" name="password"
                            type={typeInput}
                            icon={iconInput}
                            onIconMouseEnter={this.mouseEnter}
                            onIconMouseLeave={this.mouseLeave}
                            onChange={this.handleChange}
                        />
                    </MDBCol>
                    <MDBCol md="7">
                        <MDBView hover zoom>
                            <img
                                src="https://mdbootstrap.com/img/Others/documentation/img%20(131)-mini.jpg"
                                className="img-fluid rounded hoverable"
                                alt="Photo profile"
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
    console.log("mapStateToProps", state);

    return {
        userProfile: get(state, "userProfile.list.data")
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => {
            dispatch(getListActions.getUserProfile())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileManager);