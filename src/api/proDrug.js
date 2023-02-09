import request from '../utils/request';
// 添加帮助信息
export const addProvideInfo = data => {
  return request({
    method: 'post',
    url: '/api/create/provideDrug',
    // data用来设置POST请求体
    data
  });
};