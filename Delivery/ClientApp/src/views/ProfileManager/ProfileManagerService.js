import axios from "axios";
import {serverUrl} from '../../config';

export default class ProfileManagerService {
    static getUserProfile(model) {
        return axios.post(`${serverUrl}api/UserProfile/getuserprofile`, model);
    };
    static setUserBaseInfoProfile(model) {
        return axios.post(`${serverUrl}api/UserProfile/setuserprofile`, model);
    };
    static setNewPasswordProfile(model) {
        return axios.post(`${serverUrl}api/UserProfile/changepassword`, model);
    };
}