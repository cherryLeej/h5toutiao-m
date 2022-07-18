/**
 * 封装 axios 请求模块
 */
 import axios from "axios"
 import store from '@/store/index'

 const request = axios.create({
  //  baseURL: "http://ttapi.research.itcast.cn/" // 基础路径
  baseURL:'http://toutiao.itheima.net/v1_0/',
  timeout:1000 * 5
 })

 // 添加请求拦截器
 request.interceptors.request.use(function (config) {
    // 每个请求发起都会经过这里
    // config：本次请求的请求配置对象
    // 在请求头里添加token
    const user = store.state.user
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}` 
        // 或者这样写
        // config.headers['Authorization'] = `Bearer ${user.token}`
    }
    // 注意：这里务必要返回 config配置对象，否则请求就停在这里出不去了
    return config;
  }, function (error) {
    // 如果请求出错了，也就是还没有发出去的请求报错了，会进入到这里
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 响应成功了，把响应的数据返回出去，页面中拿接口返回的正确数据
    return response;
  }, function (error) {
    // 统一做错误处理，就不用在每个页面的接口那里写错误处理了
    // 如果返回的错误对象里没有response 这个属性，就代表网络超时；
    // if (!error.response) {
    //     this.$toast("网络繁忙，请稍后重试"); 
    // }
    // if (error.response?.status === 429) {
    //     this.$toast(err.response.data.message);
    // }
    /**
     * 响应失败了，把接口返回的错误信息返回出去，页面中进行toast提示错误信息
     * 错误一定要返回出去，如果不把错误返回出去，页面中拿不到错误信息，就不知道接口报错了，
     * 就不会提示错误，会认为接口成功了，会继续执行成功的逻辑
     */ 
    return Promise.reject(error);
  });
 
 export default request