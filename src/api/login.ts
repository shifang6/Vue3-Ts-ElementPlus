import request from "@/utils/request";
import { loginFromInt } from "@/types/login";
//登录
export function LoginApi(data: loginFromInt) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
