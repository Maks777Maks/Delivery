import React, { Component } from 'react';
import {
    Col, Row, Button, Form, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import * as registerActions from './reducer';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import get from "lodash.get";

class RegisterPage extends Component {
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

        error: 'Введіть, будь ласка, коректні дані',
        isChange: false,

        errors: {},
        done: false,
        isLoading: false,
        errorsServer: {},
        iconInput: 'eye-slash',
        typeInput: 'password'
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
        return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
    }

    handleChangeData = e => {
        let newState = {
            [e.target.name]: e.target.value,
            isInvalid: false
        }
        this.setState({ [e.target.name]: newState });
    };

    onSubmitForm =(e)=>{
        e.preventDefault();
        const { name, surname, email, phone, birthDate, address, password } = this.state;
        const model = {
            name: name.name,
            surname: surname.surname,
            birthDate: birthDate.birthDate.toString(),
            email: email.email,
            phone: phone.phone,
            address: address.address,
            password: password.password
        };
        console.log("Register", this.state);
        this.props.register(model);
    }

    checkValid = (e) => {
        let isValidAll = true;
        const { name, surname, email, phone, address } = this.state;

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

    render() {
        const { name, surname, birthDate, phone, email, password, address, error, typeInput, isChange } = this.state;
        let style = { marginTop: '10px', marginBottom: '5px' };
        return (
            <React.Fragment>
                <Row className="justify-content-center align-items-center">
                    <Col md={6}>
                        <Form onSubmit={this.onSubmitForm}>
                            <p className="h5 text-center mb-4">Зареєструватись</p>
                            <div className="grey-text">
                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-envelope" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                    invalid={email.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="email" 
                                    name="email" 
                                    id="idEmailProfile" 
                                    label="Електронна пошта"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>
                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-user" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    label="Iм'я"
                                    invalid={name.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="text" 
                                    name="name" 
                                    id="idNameProfile" 
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>
                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-user" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    invalid={surname.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="text" 
                                    name="surname" 
                                    id="idSurnameProfile" 
                                    label="Прізвище"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>
                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-birthday-cake" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                    invalid={birthDate.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="date" 
                                    name="birthDate" 
                                    id="idBirthDateProfile" 
                                    label="Дата наордження"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>
                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-phone" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                    invalid={phone.isInvalid} 
                                    onBlur={this.checkValid} 
                                    type="tel" 
                                    name="phone" 
                                    id="idPhoneProfile" 
                                    label="Номер телефону"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>
                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-address-card-o" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                    //invalid={address.isInvalid}
                                    onBlur={this.checkValid} 
                                    type="text" 
                                    name="address" 
                                    id="idAddressProfile" 
                                    label="Адреса"
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                            </InputGroup>
                            <InputGroup style={style}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-key" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                    invalid={password.isInvalid}
                                    type={typeInput}
                                    name="password"
                                    id="idPasswordProfile"
                                    label='Пароль'
                                    autoComplete="new-password"
                                    onChange={this.handleChangeData} />
                                <FormFeedback>{error}</FormFeedback>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText 
                                        style={{ color: 'blue' }} 
                                        onMouseEnter={this.mouseEnter} 
                                        onMouseLeave={this.mouseLeave}>
                                        {typeInput === "text" ? <i className="fa fa-eye" />: <i className="fa fa-eye-slash" />}
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>  
                            </div>
                            <Button type="submit">
                                <Link to="/login" style={{color: "white", textDecoration: "none"}}>Реєстрація</Link>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: get(state, 'register.post.loading'),
        failed: get(state, 'register.post.failed'),
        success: get(state, 'register.post.success'),
        errors: get(state, 'register.post.errors')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (model) => { dispatch(registerActions.register(model)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
