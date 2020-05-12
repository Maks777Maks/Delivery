import axios from 'axios';
import {serverUrl} from '../../../config';
export default class GraphPercentageDishesService {
  static getAllSoldDishes() {
      return axios.get(`${serverUrl}api/admin/getprocentdishes`);
  }
}
