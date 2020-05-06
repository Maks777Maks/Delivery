import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Col, Row, Button, Form, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText,
    CardImg, Collapse, ModalBody, Modal, ModalHeader, ModalFooter
} from 'reactstrap';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import no_avatar from '../../assets/images/no-avatar.png';
import { serverUrl } from '../../config';

import jwt from 'jsonwebtoken';

let user;
if (localStorage.jwtToken) {
    let data = { token: localStorage.jwtToken, refToken: localStorage.refreshToken };
    user = jwt.decode(data.token);
}

const ModalButton = (props) => {
    const {
        buttonLabel = "CHANGE BUTTON",
        submitConfirm,
        isForceShowModal = false
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const confirm = () => {
        setModal(!modal);
        if (submitConfirm)
            submitConfirm();
    };

    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal || isForceShowModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Зміна профіля</ModalHeader>
                <ModalBody>
                    Ви справді хочете змінити Ваш профіль. Повернутися до попередніх даних буде неможливо.
        </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={confirm}>Так</Button>
                    <span>  </span>
                    <Button color="light" onClick={toggle}>Ні</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

class ProfileManager extends Component {
    state = {
        name: {
            name: '',
            isInvalid: false
        },

        middleName: {
            middleName: '',
            isInvalid: false
        },

        surname: {
            surname: '',
            isInvalid: false
        },
        phone: {
            phone: '',
            isInvalid: false
        },

        email: {
            email: '',
            isInvalid: false
        },

        password: {
            password: '',
            isInvalid: false
        },

        confirmPassword: {
            confirmPassword: '',
            isInvalid: false
        },

        birthDate: {
            birthDate: '2000-01-01',
            isInvalid: false

        },

        address: {
            address: '',
            isInvalid: false

        },

        photo: no_avatar,
        profileUrl: '',
        error: 'Введіть, будь ласка, коректні дані',
        typeInput: 'password',
        isChange: false,
        isShowChangePassword: false,
        isShowChangeImage: false,
        isLoadData: false
    }

    componentDidMount = () => {
        if (user) {
            const model = { id: user.id };
            this.props.getUserProfile(model);
        }
        else
            console.log("user is not logged in", user);
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
    componentDidUpdate() {
        if (!this.state.isLoadData) {
            const { name, middleName, surname, email, phone, birthDate, address, photo } = this.props.userProfile;
            
            if (photo)
                this.setState({ photo:  serverUrl + photo});
            
            this.setState({
                name: {
                    name,
                    isInvalid: false
                },

                middleName: {
                    middleName,
                    isInValid: false
                },

                surname: {
                    surname,
                    isInvalid: false
                },
                email: {
                    email,
                    isInvalid: false
                },
                phone: {
                    phone,
                    isInvalid: false
                },
                birthDate: {
                    birthDate: this.setFormatDate(birthDate),
                    isInvalid: false
                },
                address: {
                    address,
                    isInvalid: false
                },
                isLoadData: true
            });
        }
    }

    mouseEnter = () => {
        this.setState({
            typeInput: 'text'
        });
    };

    mouseLeave = () => {
        this.setState({
            typeInput: 'password'
        });
    };

    handleChangeData = e => {
        let newState = {
            [e.target.name]: e.target.value,
            isInvalid: false
        }
        this.setState({ [e.target.name]: newState });
    };

    submitConfirm = e => {
        const { name, middleName, surname, email, phone, birthDate, address } = this.state;
        const model = {
            id: user.id,
            name: name.name,
            middleName: middleName.middleName,
            surname: surname.surname,
            birthDate: new Date(birthDate.birthDate),
            email: email.email,
            phone: phone.phone,
            address: address.address
        };
        
        this.props.setUserBaseInfoProfile(model);
    }

    checkValid = (e) => {
        let isValidAll = true;
        const { name, middleName, surname, email, phone, birthDate, address } = this.state;
        const user = [name, middleName, surname, email, phone, birthDate, address];

        user.forEach(item => {
            if (item.isInvalid)
                isValidAll = false;
        })

        let newState = {
            [e.target.name]: e.target.value,
            isInvalid: true
        }

        const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґ' -]+$/;
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        const addressRegex = /^[А-Яа-яЁёЇїІіЄєҐґ' a-zA-Z0-9\s,'-.]+$/;

        switch (e.target.name) {
            case 'name':
            case 'middleName':
            case 'surname':
                if (!nameRegex.test(e.target.value)) {
                    isValidAll = false;
                    this.setState({ [e.target.name]: newState });
                }
                break;
            case 'email':
                if (!emailRegex.test(e.target.value)) {
                    isValidAll = false;
                    this.setState({ [e.target.name]: newState });
                }
                break;
            case 'phone':
                if (!phoneRegex.test(e.target.value)) {
                    isValidAll = false;
                    this.setState({ [e.target.name]: newState });
                }
                break;
            case 'address':
                if (!addressRegex.test(e.target.value)) {
                    isValidAll = false;
                    this.setState({ [e.target.name]: newState });
                }
                break;
            default:
                console.log("AFTER SWITCH", e.target.name);
        }
        if (isValidAll)
            this.setState({ isChange: true });
        else
            this.setState({ isChange: false });
    }

    sendNewPasswordToServer = () => {
        const { password, confirmPassword } = this.state;
        let newState = {};

        if (!!!password.password) {
            newState = Object.assign(password);
            newState.isInvalid = true;
            this.setState({ password: newState });
        }

        if (!!!confirmPassword.confirmPassword) {
            newState = Object.assign(confirmPassword);
            newState.isInvalid = true;
            this.setState({ confirmPassword: newState });
        }

        if (password.isInvalid === true || confirmPassword.isInvalid === true) {
            return;
        }

        const model = {
            id: user.id,
            password: password.password,
        };

        this.props.setNewPasswordProfile(model);
        this.setState({ isShowChangePassword: false });
    }

    checkValidPasswords = (e) => {
        const { password } = this.state.password;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#$%^&*])(?=.{8,})/;

        let newState = {
            [e.target.name]: e.target.value,
            isInvalid: true
        }

        switch (e.target.name) {
            case 'password':
                if (!passwordRegex.test(e.target.value)) {
                    this.setState({ [e.target.name]: newState });
                }
                break;
            case 'confirmPassword':
                if (!passwordRegex.test(e.target.value) || e.target.value !== password) {
                    this.setState({ [e.target.name]: newState });
                }
                break;
            default:
                console.log("AFTER SWITCH CHECK PASSWORD", e.target.name);
        }
    }

    changePhoto = () => {
        this.props.history.push("/changeimage")
    }

    render() {
        const { name, middleName, surname, birthDate, phone, email, photo, password, confirmPassword, address, error,
             typeInput, isChange, isShowChangePassword, isShowChangeImage } = this.state;
       
        let style = { marginTop: '10px', marginBottom: '5px' };

        return (
            <React.Fragment>
                <Row>
                    <Col md={6}>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-user" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={name.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="text" 
                                    name="name" 
                                    id="idNameProfile" 
                                    value={name.name}
                                    placeholder="ім'я"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>

                                <Input style={{marginLeft: '5px'}}
                                    invalid={middleName.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="text" name="middleName"
                                    id="idMiddleNameProfile" 
                                    value={middleName.middleName}
                                    placeholder="по батькові"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-user" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={surname.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="text" 
                                    name="surname" 
                                    id="idSurnameProfile" 
                                    value={surname.surname}
                                    placeholder="прізвище"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-phone" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={phone.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="tel" 
                                    name="phone" 
                                    id="idPhoneProfile" 
                                    value={phone.phone}
                                    placeholder="телефон"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-envelope" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={email.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="email" 
                                    name="email" 
                                    id="idEmailProfile" 
                                    value={email.email}
                                    placeholder="example@gmail.com"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-birthday-cake" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={birthDate.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="date" 
                                    name="birthDate" 
                                    id="idBirthDateProfile" 
                                    value={birthDate.birthDate}
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-address-card-o" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={address.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="text" 
                                    name="address" 
                                    id="idAddressProfile" 
                                    value={address.address}
                                    placeholder="адреса"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>
                            <Collapse isOpen={isChange}>
                                <ModalButton buttonLabel={'Зберегти зміни'} submitConfirm={this.submitConfirm} ></ModalButton>
                            </Collapse>

                            <InputGroup style={{ marginTop: '20px' , color: 'blue' }}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-key" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                    style={{ color: 'blue' }}
                                    type="button" 
                                    value="Змінити пароль"
                                    onClick={() => { this.setState({ isShowChangePassword: !isShowChangePassword }) }} ></Input>
                            </InputGroup>
                            
                            <Modal isOpen={isShowChangePassword} toggle={() => { this.setState({ isShowChangePassword: !isShowChangePassword }) }}>
                                <ModalHeader toggle={() => { this.setState({ isShowChangePassword: !isShowChangePassword }) }}>Зміна пароля</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={(e) => e.preventDefault()}>
                                        <InputGroup style={style}>
                                            <h5>Пароль має містити: латинські букви; щонайменше 1-ну прописну букву,
                                            1-ну маленьку букву, 1-ну цифру і один спеціальний символ;
                                            мінімальна довжина - 6 символів</h5>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="fa fa-key" aria-hidden="true"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input invalid={password.isInvalid}
                                                name="password"
                                                type={typeInput}
                                                placeholder="Введіть новий пароль"
                                                id="idPasswordProfile"
                                                value={password.password}
                                                autoComplete="username"
                                                onChange={this.handleChangeData}
                                                onBlur={this.checkValidPasswords} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText style={{ color: 'blue' }} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                                    {typeInput === "text" ? <i className="fa fa-eye" />
                                                        : <i className="fa fa-eye-slash" />}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <FormFeedback>{error}</FormFeedback>
                                        </InputGroup>

                                        <InputGroup style={style}>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="fa fa-key" aria-hidden="true"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input invalid={confirmPassword.isInvalid}
                                                type={typeInput}
                                                name="confirmPassword"
                                                placeholder="Підтвердіть пароль"
                                                id="idConfirmPasswordProfile"
                                                value={confirmPassword.confirmPassword}
                                                autoComplete="username"
                                                onChange={this.handleChangeData}
                                                onBlur={this.checkValidPasswords} />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText style={{ color: 'blue' }}
                                                    onMouseEnter={this.mouseEnter}
                                                    onMouseLeave={this.mouseLeave}>
                                                    {typeInput === "text" ? <i className="fa fa-eye" />
                                                        : <i className="fa fa-eye-slash" />}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <FormFeedback>{error}</FormFeedback>
                                        </InputGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.sendNewPasswordToServer}>Так</Button>
                                    <span>  </span>
                                    <Button color="light" 
                                    onClick={() => { this.setState({ isShowChangePassword: !isShowChangePassword }) }}>Ні</Button>
                                </ModalFooter>
                            </Modal>
                        </Form>
                    </Col>
                    <Col md={6}>

                        <CardImg style={style} onMouseOver={() => { this.setState( {isShowChangeImage: !isShowChangeImage} ) }} 
                        src={photo} alt="ProfileCard" />
                        <Collapse isOpen={isShowChangeImage}>
                            <ModalButton buttonLabel={'Поміняти фотографію'} submitConfirm={this.changePhoto}></ModalButton>
                        </Collapse>
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Link to="/client">
                        <Button outline color="primary" style={{ marginTop: '20px' }} > Повернутися </Button>
                    </Link>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userProfile: get(state, "userProfile.list.data")
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (model) => { dispatch(getListActions.getUserProfile(model)) },
        setUserBaseInfoProfile: (model) => { dispatch(getListActions.setUserBaseInfoProfile(model)) },
        setNewPasswordProfile: (model) => { dispatch(getListActions.setNewPasswordProfile(model)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileManager);