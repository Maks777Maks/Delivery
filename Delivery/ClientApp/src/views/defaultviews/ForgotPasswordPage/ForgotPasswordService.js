import axios from 'axios';
import {serverUrl} from '../../../config';

export default class ForgotPasswordService{
    static sendEmail(model){
        const url = `${serverUrl}/api/auth/forgot-password`;
        return axios.post(url, model);
    }
}