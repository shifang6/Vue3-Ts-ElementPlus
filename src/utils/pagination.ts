export interface goodsList {
  id: number;
  title: string;
  introduce: string;
  userId?: string;
}
//分页查询
export function pagination(
  pageNum: number = 1,
  pageSize: number = 10,
  array: goodsList[]
) {
  var offset = (pageNum - 1) * pageSize;
  return offset + pageSize >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + pageSize);
}
