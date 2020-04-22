import axios from 'axios';
import {serverUrl} from '../../../config';

export default class UsersStatsService{
    static getAllUsers(filter){
        const url=`${serverUrl}api/admin/getusers`;
        return axios.post(url, filter);
    }
}