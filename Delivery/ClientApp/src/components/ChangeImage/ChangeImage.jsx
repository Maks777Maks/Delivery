import React, { Component } from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import CropperPage from '../cropper/CropperPage';
import { serverUrl } from '../../config';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Row,
    Container
} from "reactstrap";

import no_avatar from '../../assets/images/no-avatar.png';

import jwt from 'jsonwebtoken';

let user = {};
if (localStorage.jwtToken) {
    let data = { token: localStorage.jwtToken, refToken: localStorage.refreshToken };
    user = jwt.decode(data.token);
}

class ChangeImage extends Component {
    state = {
        image: '',
        croppedImage: ''
    }

    componentDidMount = () => {
        if (user) {
            const model = { id: user.id };
            console.log("GET USER PHOTO", model);
            this.props.getImage(model);
        }
        else
            console.log("user is not logged in", user);
    }

    triggerChildInput = () => {
        this.refs.cropperPage.handleClick();
    };

    getCroppedImage = img => {
        this.setState(
            {
                isLoading: true,
                croppedImage: img
            },
            this.changeImage
        );
    };

    changeImage = () => {
        if (user) {
            const model = {
                id: user.id,
                photo: this.state.croppedImage
            };
            console.log("CHANGE USER PHOTO", model);
            this.props.changeImage(model);
        }
        else {
            console.log("user is not logged in", user);
        }
    };

    render() {
        const { photo } = this.props;
        let path = '';
        if (photo)
            path = serverUrl + photo;
        else
            path = no_avatar;

        return (
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Card className="p-2">
                        <CardBody>

                            <CardGroup className="mb-3">
                                <Card>
                                    <CardBody>
                                        <img className="rounded mx-auto d-block" src={`${path}?t=${new Date().getTime()}`} alt="" />
                                    </CardBody>
                                </Card>
                            </CardGroup>
                            <Button color="primary" className="px-4"
                                onClick={this.triggerChildInput}>
                                Загрузити фото
                            </Button>
                            
                            <Button color="light" onClick={() => {this.props.history.goBack()}} className="px-4">
                                    Повернутися
                            </Button>

                        </CardBody>
                        <CropperPage ref="cropperPage" getCroppedImage={this.getCroppedImage} isHidden={true} isForAvatar={true} />
                    </Card>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: get(state, 'changeImage.list.errors'),
        photo: get(state, 'changeImage.list.photo')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeImage: model => {
            dispatch(getListActions.changeImage(model));
        },
        getImage: model => {
            dispatch(getListActions.getImage(model));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeImage);