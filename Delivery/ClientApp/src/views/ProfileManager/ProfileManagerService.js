import axios from "axios";
import {serverUrl} from '../../config';

export default class ProfileManagerService {
    static GetUserProfile(model) {
        return axios.post(`${serverUrl}api/UserProfile/getuserprofile`, model)
    };
    static SetUserProfile(model) {
        return axios.post(`${serverUrl}api/UserProfile/getuserprofile`, model)
    };
    static SetUserPhoto(model) {
        return axios.post(`${serverUrl}api/UserProfile/getuserprofile`, model)
    };
}