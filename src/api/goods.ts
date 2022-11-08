import request from "@/utils/request";
import { goodsFormInt } from "@/types/goods";

//get goods list api
export function GetGoodsListApi(params?: goodsFormInt) {
  return request({
    url: "/getGoodsList",
    method: "GET",
    params,
  });
}
