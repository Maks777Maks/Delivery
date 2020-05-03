import axios from 'axios';
import {serverUrl} from '../../../config';


export default class GraphPercentageDishesService{
    static getAllSoldDishes(){
        const url=`${serverUrl}api/admin/getprocentdishes`;
        return axios.get(url);
    }
}