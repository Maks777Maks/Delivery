import React, { Component, useState } from 'react';
import {
    Col, Row, Button, Form, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText,
    CardImg, Collapse, ModalBody, Modal, ModalHeader, ModalFooter
} from 'reactstrap';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";

import jwt from 'jsonwebtoken';

let user;
if (localStorage.jwtToken) {
    let data = { token: localStorage.jwtToken, refToken: localStorage.refreshToken };
    user = jwt.decode(data.token);
}

const CardWithButton = (props) => {
    const { srcImg, submitConfirm } = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <CardImg onMouseOver={toggle} src={srcImg} alt="ProfileCard"
            />
            <Collapse isOpen={isOpen}>
                <ModalButton buttonLabel={'Поміняти фотографію'} submitConfirm={submitConfirm}></ModalButton>
            </Collapse>
        </div>
    );
}

const CollapseButton = (props) => {
    const { submitConfirm, isShowSubmitBtn, isForceShowModal = false } = props;
    return (
        <Collapse isOpen={isShowSubmitBtn}>
            <ModalButton buttonLabel={'Зберегти зміни'} submitConfirm={submitConfirm}
                isForceShowModal={isForceShowModal}></ModalButton>
        </Collapse>
    );
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
        else { alert("HELOO") };
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
            name: 'client name',
            isInvalid: false
        },
        surname: {
            surname: 'client surname',
            isInvalid: false
        },
        phone: {
            phone: 'client phone',
            isInvalid: false
        },

        email: {
            email: 'client email',
            isInvalid: false
        },

        password: {
            password: 'password',
            isInvalid: false
        },

        birthDate: {
            birthDate: '2000-01-01',
            isInvalid: false

        },

        address: {
            address: 'client address',
            isInvalid: false

        },

        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png',
        profileUrl: '',
        error: 'Введіть, будь ласка, коректні дані',
        typeInput: 'password',
        isChange: false,
    }

    componentDidMount = () => {
        if (user) {
            const model = { id: user.id };
            console.log("GET_PROFILE USER", model);
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
    componentDidUpdate(prevProps) {
        if (this.props.userProfile.email !== prevProps.userProfile.email) {
            const { name, surname, email, phone, birthDate, address, photo } = this.props.userProfile;
            if (photo)
                this.setState({ photo });
            this.setState({
                name: {
                    name,
                    isInvalid: false
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
                }
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
        const { name, surname, email, phone, birthDate, address } = this.state;
        const model = {
            id: user.id,
            name: name.name,
            surname: surname.surname,
            birthDate: new Date(birthDate.birthDate),
            email: email.email,
            phone: phone.phone,
            address: address.address
        };
        console.log("SET_PROFILE USER", model);
        this.props.setUserBaseInfoProfile(model);
    }
    
    checkValid = (e) => {
        let isValidAll = true;
        const { name, surname, email, phone, birthDate, address } = this.state;
        const user = [name, surname, email, phone, birthDate, address];
        
        user.forEach(item => {
            if(item.isInvalid)
            isValidAll = false;
        })

        let newState = {
            [e.target.name]: e.target.value,
            isInvalid: true
        }
        
        const nameRegex = /^[А-Яа-яЁёЇїІіЄєҐґ' ]+$/;
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        const addressRegex = /^[А-Яа-яЁёЇїІіЄєҐґ' a-zA-Z0-9\s,'-.]+$/;

        switch (e.target.name) {
            case 'name':
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
                console.log("AFTER SWITCH" , e.target.name);
        }
        if(isValidAll)
        this.setState({isChange: true});
        else
        this.setState({isChange: false});
    }

    changePhoto = () => {
        alert("Super you can change photo");
    }

    render() {
        const { name, surname, birthDate, phone, email, photo, password, address, error, typeInput, isChange } = this.state;
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
                                <Input invalid={name.isInvalid} onBlur={this.checkValid} type="text" name="name" id="idNameProfile" value={name.name}
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-user" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={surname.isInvalid} onBlur={this.checkValid} type="text" name="surname" id="idSurnameProfile" value={surname.surname}
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-phone" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={phone.isInvalid} onBlur={this.checkValid} type="tel" name="phone" id="idPhoneProfile" value={phone.phone}
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-envelope" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={email.isInvalid} onBlur={this.checkValid} type="email" name="email" id="idEmailProfile" value={email.email}
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-birthday-cake" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={birthDate.isInvalid} onBlur={this.checkValid} type="date" name="birthDate" id="idBirthDateProfile" value={birthDate.birthDate}
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-address-card-o" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={address.isInvalid} onBlur={this.checkValid} type="text" name="address" id="idAddressProfile" value={address.address}
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>

                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-key" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input invalid={password.isInvalid}
                                    type={typeInput}
                                    name="password"
                                    id="idPasswordProfile"
                                    value={password.password}
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText style={{ color: 'blue' }} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                        {typeInput === "text" ? <i className="fa fa-eye" />
                                            : <i className="fa fa-eye-slash" />}
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>

                            <CollapseButton submitConfirm={this.submitConfirm} isShowSubmitBtn={isChange}></CollapseButton>
                        </Form>
                    </Col>
                    <Col md={6}>
                        <CardWithButton srcImg={photo} submitConfirm={this.changePhoto} />
                    </Col>
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
        setUserBaseInfoProfile: (model) => { dispatch(getListActions.setUserBaseInfoProfile(model)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileManager);