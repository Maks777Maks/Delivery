import axios from 'axios';
import {serverUrl} from '../../../config';

export default class BestsellerService{
    static getAllDishes(filter){
        const url=`${serverUrl}api/admin/getdishes`;
        return axios.post(url, filter);
    }
}