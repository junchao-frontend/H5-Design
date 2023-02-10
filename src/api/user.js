import request from '../utils/request';

// 注册用户
export const registerUser = data => {
  return request({
    method: 'post',
    url: '/api/create/user',
    // data用来设置POST请求体
    data
  });
};
// 登陆用户
export const toLogin = data => {
  return request({
    method: 'post',
    url: '/api/login',
    // data用来设置POST请求体
    data
  });
};