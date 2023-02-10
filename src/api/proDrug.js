import request from '../utils/request';
// 添加帮助信息
export const addProvideInfo = data => {
  return request({
    method: 'post',
    url: '/create/provideDrug',
    // data用来设置POST请求体
    data
  });
};
// 更新帮助
export const editProHelpInfo = data => {
  return request({
    method: 'put',
    url: '/edit/provideDrug',
    // data用来设置POST请求体
    data
  });
};
//展示帮助信息
export const showProHelp = userId => {
  return request({
    method: 'get',
    url: `/drug/showProHelp/${userId}`,
  });
};
