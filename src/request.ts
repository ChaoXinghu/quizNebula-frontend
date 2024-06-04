import axios from "axios";

//全局请求
const myAxios = axios.create({
  baseURL: "http://localhost:8101",
  timeout: 10000,
  withCredentials: true,
});

//全局请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    console.log(response);
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { data } = response;

    //未登录
    if (data.code === 40100) {
      //不是获取用户信息的请求，或者不是已经在用户登录页面，则跳转到登陆页面
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`; //重定向到登录页
      }
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default myAxios;