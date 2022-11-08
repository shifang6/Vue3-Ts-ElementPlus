export interface goodsFormInt {
  id: number;
  title: string;
  introduce: string;
  userId?: string;
  pageNum: number;
  pageSize: number;
  total: number;
}
export interface goodsList {
  id: number;
  title: string;
  introduce: string;
  userId?: string;
}

export class GoodsData {
  goodsFormInt = {
    id: 1,
    title: "",
    introduce: "",
    userId: "",
    pageNum: 1,
    pageSize: 10,
    total: 1,
  };
  goodsRows: goodsList[] = [];
  handleList: goodsList[] = [];
}
