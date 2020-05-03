import axios from 'axios';
import {serverUrl} from '../../../config';

export default class TypesOfDishesService{
    static  getAllTypesOfDishes(filter){
        const url=`${serverUrl}api/client/gettypesdishes`;
        return axios.post(url, filter);
    }
}