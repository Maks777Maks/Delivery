import axios from "axios";
import {serverUrl} from '../../../config';

export default class RegisterService {
    static register(model) {
        console.log("Register Service", model);
        return axios.post(`${serverUrl}api/auth/register`, model)
    };
}