import axios from "axios";
import {serverUrl} from '../../config';

export default class ProfileManagerService {
    static getUserProfile() {
        return axios.get(`${serverUrl}api/UserProfile/getuserprofile`);
    };
    static setUserBaseInfoProfile(model) {
        return axios.post(`${serverUrl}api/UserProfile/setuserprofile`, model);
    };
    static setNewPasswordProfile(model) {
        return axios.post(`${serverUrl}api/UserProfile/changepassword`, model);
    };
}