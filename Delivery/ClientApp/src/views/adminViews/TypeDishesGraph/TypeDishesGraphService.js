import axios from 'axios';
import {serverUrl} from '../../../config';
export default class TypeDishesGraphService {
  static getAllTypeDishes() {
      return axios.get(`${serverUrl}api/admin/getprocenttypedishes`);
  }
}