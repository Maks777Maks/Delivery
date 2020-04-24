import axios from "axios";
import {serverUrl} from '../../config';

export default class ChangeImageService {
    static getImage() {       
        return axios.get(`${serverUrl}api/settings/get-image`)
    };
    static changeImage(model) {       
        return axios.post(`${serverUrl}api/settings/change-image`, model)
    };
}