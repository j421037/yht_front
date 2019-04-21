import Axios from 'axios';
import tool from './tool.js';
import appConst from './appConst.js';

export const appURL = appConst.BACKEND_DOMAIN;
export const token = tool.getter('token');

export const post = (url, query) => {
	//设置请求头
	const token = 'Bearer ' + tool.getter('token');
	let _url = `${appConst.BACKEND_DOMAIN}${url}`;
	// console.log(token);
	return Axios.post( _url, query, 
			{ 
				headers: { authorization: token ,'X-Requested-With': 'XMLHttpRequest'}
			}
		   )
			.then( (response) => {
				if (response.status >= 200 && response.status < 300) {
					if (response.headers.authorization !== '' && typeof(response.headers.authorization) != 'undefined') {
						tool.setter('token', response.headers.authorization);
					}

					return response.data;
				}
			})
			.catch( (err) => {
				errorProcess(err);
      			return Promise.reject(err);
			});
}

export const get = (url, query) => {
	const token = 'Bearer ' + tool.getter('token');
	let _url = `${appConst.BACKEND_DOMAIN}${url}`;
	
	if (query) {
		_url = `${appConst.BACKEND_DOMAIN}${url}?${query}`;
	}
	
	return Axios.get( _url, 
			{ 
				headers: { authorization: token }
			}
		   )
			.then( (response) => {
				if (response.status >= 200 && response.status < 300) {
					if (response.headers.authorization !== '' && typeof(response.headers.authorization) != 'undefined') {
						tool.setter('token', response.headers.authorization);
					}
					return response.data;
				}
			})
			.catch( (err) => {

				errorProcess(err);

      			return Promise.reject(err);
			});
}

const errorProcess = (err) => {
  if (err.response.status == 401 || err.response.status == 400) {
  	tool.setter('token', '');
    window.location.href = '#/login';
  }

  if (err.response.status == 403) {
  	window.location.href = '#/app/403';
  }

  if (err.response.status == 404) {
  	window.location.href = '#/app/404';
  }
}
