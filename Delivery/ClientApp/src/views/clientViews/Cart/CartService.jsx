import axios from 'axios';
import {serverUrl} from '../../../config';

export default class CartService{
    static  getCart(filter){
        const url=`${serverUrl}api/client/getcart`;
        return axios.post(url, filter);
    }
}