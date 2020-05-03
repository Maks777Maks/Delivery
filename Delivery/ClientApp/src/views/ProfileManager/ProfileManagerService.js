import axios from "axios";
import {serverUrl} from '../../config';

export default class ProfileManagerService {
    static getUserProfile(model) {
        return axios.post(`${serverUrl}api/UserProfile/getuserprofile`, model)
    };
    static setUserBaseInfoProfile(model) {
        console.log("Hello from Service", model);
        return axios.post(`${serverUrl}api/UserProfile/setuserprofile`, model)
    };
    static setUserPhoto(model) {
        return axios.post(`${serverUrl}api/UserProfile/getuserprofile`, model)
    };
}