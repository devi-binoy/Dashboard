import axios from 'axios';
import { useContext } from 'react';
// import { useAuth } from '../context/auth.context';
import { createBrowserHistory } from 'history';
import { toast } from 'react-toastify';
const history = createBrowserHistory();

const apiRoot = "-";

//acccess token is stored in localstorage as MCData after login
const token = JSON.parse(localStorage.getItem("MCData"));

// const token = useContext(AuthContext);
const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

const axiosInstance = axios.create({
    baseURL: apiRoot,
});


function requestHandler(request) {
    request.headers['Platform'] = 'Web';
    if (localStorage.MCData){
        const { token, refreshToken } = JSON.parse(localStorage.MCData);
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }
        if (refreshToken) {
            request.headers.refreshToken = refreshToken;
        }
    }
    return request;
    
}

function responseSuccess(response) {
    if(localStorage.MCData) {
        var MCData = JSON.parse(localStorage.MCData);
        const { token, refreshToken } = response.headers;
        if (token != null && refreshToken != null) {
            if (token != MCData.token && refreshToken != MCData.refreshToken) {
                MCData.token = token;
                MCData.refreshToken = refreshToken;
                localStorage.removeItem('MCData');
                localStorage.setItem('MCData', JSON.stringify(MCData));
            }
        }
    }
    return response;
}

function responseFailed(error) {
    if ( error && 
        error.response && 
        error.response.data && 
        error.response.data.message == 'ReLogin') {
        localStorage.clear();
        history.pushState({}, '', '/Login');
        window.location.href='#logout';

        return Promise.reject({ ...error });
    }
    if ( error.request &&
         error.request.status &&
         ( error.request.status == '400' || error.request.status == '404')
        ) {
            return Promise.reject({ ...error });
        }
        return Promise.reject({...error });
}

function errorHandler(error) {
    if (error) {
        let {response} = error;
        let { data } = response || {};
        if (error && error.isAxiosError && !response) {
            toast.error('Network Issue or Server Down', {
                autoClose: 3000,
                toastId: 'network',
              });
        }
        else if (response && response.status == 401) {
            toast.error("Token has expired please login", {
              autoClose: 3000,
              toastId: 'network',
            });
          } 
          else if (data && data.statusCode && data.statusCode == 400 && data.message && data.message.message) {
            toast.error(response.data.message.message.join('\n'), {
              autoClose: 3000,
              toastId: 'network',
            });
          }
    }
}

class httpService {
    constructor() {


    //adding interceptors 
    if(axiosInstance.interceptors.request.handlers.length == 0) { //checking if there are no interceptors registered
        axiosInstance.interceptors.request.use ((request) =>
        requestHandler(request)
        );

        axiosInstance.interceptors.response.use (
            (response) => responseSuccess(response),
            (error) => responseFailed(error)
        );
    }
    }

    getWithHeader(path, header) {
        if(path) {
            return axiosInstance.get(apiRoot + path, header, config);
        }
    }

    async get(path,model) {
        return new Promise((resolve,reject) => {
            if(path) {
                try {
                    return axiosInstance.get(
                        apiRoot + path,
                        model,
                        config
                    )
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        errorHandler(error);
                        reject(error);
                    });
                }
                catch(error) {
                    reject(error);
                }  
            }
        });
    }
    post(path, model) {
        return new Promise((resolve, reject) => {
          if (path) {
            try {
              return axiosInstance
                .post(apiRoot + path, model, config)
                .then((result) => {
                  resolve(result);
                })
                .catch((error) => {
                  errorHandler(error);
                  reject(error);
                });
            } catch (error) {
              reject(error);
            }
          }
        });
      }
      put(path, model) {
        return new Promise((resolve, reject) => {
          if (path) {
            try {
              return axiosInstance.put(apiRoot + path, model, config)
                .then((result) => {
                  resolve(result);
                })
                .catch((error) => {
                  errorHandler(error);
                  reject(error);
                });
            } catch (error) {
              reject(error);
            }
          }
        });
      }
      patch(path, model) {
        return new Promise((resolve, reject) => {
          if (path) {
            try {
              return axiosInstance.patch(apiRoot + path, model, config)
                .then((result) => {
                  resolve(result);
                })
                .catch((error) => {
                  errorHandler(error);
                  reject(error);
                });
            } catch (error) {
              reject(error);
            }
          }
        });
      }
      remove(path, model) {
        return new Promise((resolve, reject) => {
          if (path) {
            try {
              return axiosInstance.delete(apiRoot + path, { data: model }, config)
                .then((result) => {
                  resolve(result);
                })
                .catch((error) => {
                  errorHandler(error);
                  reject(error);
                });
            } catch (error) {
              reject(error);
            }
          }
        });
      }
}

export const http = new httpService();
export const getWithHeader = new httpService().getWithHeader;
export const get = new httpService().get;
export const post = new httpService().post;
export const put = new httpService().put;
export const patch = new httpService().patch;
export const remove = new httpService().remove;
export const apiUrl = apiRoot;