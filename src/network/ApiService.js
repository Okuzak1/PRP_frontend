import axios from 'axios';
import './AxiosConfig.js';


// 通用GET请求
export const getRequest = (url, params = {}) => {
    return axios.get(url, { params });
};

// 示例请求：PathVariable
export const getRequestPathVariable = (v) => {
    return axios.get(`/users/${v}`);
};

// 示例请求：RequestParam
export const getRequestParams = (queryParams) => {
    return axios.get('/users', { params: queryParams });
};

// 通用POST请求
export const postRequest = (url, data, isFormData = false) => {
    if (isFormData) {
        const formData = new FormData();
        
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        return axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data'},
        });
    } else {
        return axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
};


// 通用PUT请求
export const putRequest = (url, data) => {
    return axios.put(url, data);
};

// 通用DELETE请求
export const deleteRequest = (url, params = {}) => {
    return axios.delete(url, { params });
};





// 示例POST请求：包含文件的form-data
// const uploadFile = (data) => {
//     return postRequest('/upload', data, true);
// };

// 示例POST请求：JSON数据
// const createUser = (userData) => {
//     return postRequest('/users', userData);
// };
