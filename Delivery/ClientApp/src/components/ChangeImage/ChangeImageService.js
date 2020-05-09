import axios from "axios";
import {serverUrl} from '../../config';

export default class ChangeImageService {
    static getImage(model) {       
        return axios.post(`${serverUrl}api/settings/get-image`, model)
    };
    static changeImage(model) {       
        return axios.post(`${serverUrl}api/settings/change-image`, model)
    };
}