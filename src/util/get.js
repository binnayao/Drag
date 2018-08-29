import axios from 'axios';
import config from './config';
import cookie from 'js-cookie';
const baseURL = config.get('host');
import { Toast } from 'antd-mobile';

function post(url, body, type) {
  return new Promise(function (resolve, reject) {
    axios.create({
      baseURL,
      timeout: 65000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .get(url, { params: body })
      .then((response) => {
        let res = response.data;
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export default post;