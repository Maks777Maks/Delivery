import axios from 'axios'
import {serverUrl} from "../../../config"

export default class ChangePasswordService{
    static ChangePassword(model){
        let url = `${serverUrl}/api/auth/change-password`;
        return axios.post(url, model)
    }
}