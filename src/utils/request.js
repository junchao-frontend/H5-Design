import axios from "axios";
const request = axios.create({
  baseURL: 'http://127.0.0.1:7001' // 测试服务器
});

request.interceptors.request.use(
  config => {
    // Do something before request is sent
    // 保存在store里的token的
    let token = sessionStorage.getItem('token');
    if (token) {
      // 设置的自定义请求头Highlight-Token在后端获取时变为小写highlight-token
      // 这里别相信很多博主说的要拼接Bearer加一个空格，像这样
      // config.headers["Highlight-Token"] = Bearer+" "+getToken();
      // 甚至还在后台写了个 token = request.header["highlight-token"].split[" "][1]
      // 我真是服了这群人了
      config.headers["token"] = token;
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
// request.interceptors.response.use(
//   response => {
//     const res = response.data;
//     console.log(res);
//     if (res) {
//       // 这个是后台自定义的code哦，不是http里的状态码哦
//       if (res.code !== 200) {
//         console.error(res);
//         // 在这里处理异常，如res.code===50008 token失效重置token等等
//       } else {
//         // return Promise.reject(res);
//       }
//     } else {
//       return Promise.reject("error");
//     }
//   },
//   error => {
//     console.log(error); // for debug
//     Promise.reject(error);
//     // 接口返回数据异常信息
//   }
// );
// 导出请求方法
export default request;
