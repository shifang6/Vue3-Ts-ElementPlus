import axios from "axios";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { de } from "element-plus/es/locale";

const request = axios.create({
  baseURL:
    "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
  timeout: 5000,
});
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

request.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (getToken()) config.headers.token = getToken();
  return config;
});

request.interceptors.response.use(
  (config) => {
    // ts的解构赋值
    /******
     * const objs= { a:100,b:"张三",c:false}
     *const {a,b,c}:{a:number,b:string,c:boolean}=objs;
     console.log(a,b,c)
     *
     */
    const { code }: { code: number } = config.data.data;
    console.log("code", code);
    if (code != 200) return Promise.reject();
    return config.data.data;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

export default request;
