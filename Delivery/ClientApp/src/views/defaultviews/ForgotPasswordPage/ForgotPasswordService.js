import axios from 'axios';
import {serverUrl} from '../../../config';

export default class ForgotPasswordService{
    static SendEmail(model){
        const url = `${serverUrl}/api/auth/sendemail`;
        return axios.post(url, model);
    }
}