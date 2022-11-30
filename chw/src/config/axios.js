import axios from "axios";

import config from "./config";
import { decrypt, encrypt } from "./crypto/CryptoAES";


const getLocalAccessToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
const getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken;
};


axios.interceptors.request.use(
  (config) => {
    // const token = getLocalAccessToken();
    // localStorage.setItem("token", token);
    // if (token) {
    //   config.headers["Authorization"] = token;

    // }
    config['headers']['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return config;
  },
  (error) => {
    console.log("config>>>", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    let data;
    if(res.data.statusCode===200){
    const decryptres = JSON.parse(decrypt(res.data.data))
     data = {
      ...res.data,
      ['data']: decryptres
    }
  }else{
    data=res.data
  }
     return data;
    // return res;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        //  originalConfig._retry = true;
        // try {

        //   const response = await refreshToken();
        //   localStorage.setItem("token", response.data.token);
        //   localStorage.setItem("refreshToken", response.data.refreshToken);
        //   originalConfig.headers.Authorization = `Bearer ` + response.data.token;
        //   console.log("originalConfig",originalConfig)
        //   return axios(originalConfig);

        // } catch (error) {
        //   if (error.response && error.response.data) {
        //     return Promise.reject(error.response.data);
        //   }
        //   return Promise.reject(error);
        // }
// console.log("first token",localStorage.getItem('token'))
        return axios
                .post(config.default.refreshtoken, {
                  data:encrypt({
                    Token: localStorage.getItem('token'),
                    RefreshToken: localStorage.getItem('refreshToken')
                }),
                })
                .then((res) => {
                  // console.log("token",res.data.token)
                  // console.log("retoken",res.data.refreshToken)
                    if ( res.data.token ) {
                      // console.log("refresh")
                      localStorage.setItem("token", res.data.token);
                      localStorage.setItem("refreshToken", res.data.refreshToken);
                      originalConfig.headers.Authorization = `Bearer ` + res.data.token;
                        return axios(originalConfig);
                    }
                });

      }
    }
  }
);


function refreshToken() {
  return axios.post(
    config.default.refreshtoken,
    {data:encrypt(
    {
      token: getLocalAccessToken(),
      refreshToken: getLocalRefreshToken(),
    }
    )}
  )
}
