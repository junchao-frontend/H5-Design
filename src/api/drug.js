import request from '../utils/request';

// 添加求助信息
export const addNeedInfo = data => {
  return request({
    method: 'post',
    url: '/create/needDrug',
    // data用来设置POST请求体
    data
  });
};
// 更新求助
export const editHelpInfo = data => {
  return request({
    method: 'put',
    url: '/edit/needDrug',
    // data用来设置POST请求体
    data
  });
};
//展示求助信息
export const showHelp = userId => {
  return request({
    method: 'get',
    url: `/drug/showHelp/${userId}`,
  });
};


