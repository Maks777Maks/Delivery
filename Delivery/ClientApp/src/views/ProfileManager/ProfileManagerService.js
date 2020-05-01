import axios from "axios";
import {serverUrl} from '../../config';

export default class ProfileManagerService {
    static GetUserProfile() {
        return axios.get(`${serverUrl}api/UserProfile/getuserprofile`)
    };
    static SetUserProfile(model) {
        return axios.post(`${serverUrl}api/auth/login`, model)
    };
    static SetUserPhoto(photo) {
        return axios.post(`${serverUrl}api/auth/login`, photo)
    };
}