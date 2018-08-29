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
        'Access-Token': cookie.get('token')
      }
    })
      .post(url, body)
      .then((response) => {
        let res = response.data;
        if (res.status === "success") {
          resolve(res.data)
        } else {
          if (type !== undefined)
            resolve('error')
          if (typeof res.message === 'string')
            Toast.fail(res.message, 1.5);
          else {
            for (let i in res.message) {
              Toast.fail(res.message[i][0], 1.5);
              break;
            }
          }
        }
      })
      .catch((error) => {
        reject(error)
      });
  })
}
export default post;