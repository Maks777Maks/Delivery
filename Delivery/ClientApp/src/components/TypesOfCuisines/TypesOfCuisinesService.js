import axios from 'axios';
import {serverUrl} from '../../config'

export default class TypesOfCuisinesService{
    static  getAllTypesOfCuisines(filter){
        const url=`${serverUrl}api/client/gettypescuisines`;
        return axios.post(url, filter);
        
    }
   }