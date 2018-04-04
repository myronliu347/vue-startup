import axios from 'axios';

const instance = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json',
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

// 错误处理拦截器
const checkError = (res) => {
    if (res.status === 200) return res;
    let errorMsg = '网络异常,请稍后重试';
    if (res.data) errorMsg = res.data.message || res.statusText || errorMsg;
    const httpError = new Error(errorMsg);
    httpError.message = errorMsg;
    httpError.code = res.data.code;
    throw httpError;
};

instance.interceptors.response.use(checkError);

const http = {};
['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
    http[method] = (url, data, config) => {
        return instance.request({
            url,
            method,
            data,
            params: method === 'get' ? data : {},
            ...config
        }).then(res => res.data);
    };
});

export default http;
