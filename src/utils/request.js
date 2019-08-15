import fetch from 'dva/fetch';
import { message } from 'antd';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  message.loading('加载中...', 2);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  const { method = 'GET', body = {} } = options;
  const opt = { method, credentials: options.credentials || 'include' };
  const formData = new FormData();
  if (method === 'POST') {
    Object.keys(body).forEach(key => {
      key !== undefined && formData.append(key, body[key]);
    });
    opt.body = formData;
  }
  return fetch(url, opt)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      const { code, msg, data: result } = data;
      if (code === 0) {
        message.destroy();
        return result || {};
      }
      message.destroy();
      message.error(msg, 2);
    })
    .catch(err => {
      throw new Error(err);
    });
}
