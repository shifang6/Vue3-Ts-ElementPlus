<template>
  <div class="mt-10px query-page-style">
    <!--条件搜索-->
    <el-form ref="refSearchForm" :inline="true" :model="goodsFormInt">
      <el-form-item prop="name">
        <el-input
          v-model="goodsFormInt.title"
          class="w-150px"
          placeholder="标题"
        />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="goodsFormInt.introduce"
          class="w-150px"
          placeholder="详情"
        />
      </el-form-item>
      <el-form-item>
        <!--查询按钮-->
        <el-button type="primary" @click="resetPageReq">查询</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="handleList" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" header-align="center" />
      <el-table-column
        prop="title"
        show-overflow-tooltip="true"
        label="标题"
        width="180"
        header-align="center"
      />
      <el-table-column
        prop="introduce"
        show-overflow-tooltip="true"
        label="详情"
        header-align="center"
      />
    </el-table>
    <el-pagination
      v-model:currentPage="goodsFormInt.pageNum"
      v-model:page-size="goodsFormInt.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsFormInt.total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { goodsFormInt, goodsList, GoodsData } from "@/types/goods";
import { GetGoodsListApi } from "@/api/goods";
import { pagination } from "@/utils/pagination";

export default defineComponent({
  setup() {
    const data = reactive(new GoodsData());
    //获取list列表数据
    const getList = (params = data.goodsFormInt) => {
      GetGoodsListApi(params).then((res) => {
        console.log(res);
        data.goodsRows = res.data;
        handlePagerCut(
          data.goodsFormInt.pageNum,
          data.goodsFormInt.pageSize,
          data.goodsRows
        );
        data.goodsFormInt.total = res.data.length;
      });
    };
    // 创建后调用
    getList();
    // 查询按钮
    const resetPageReq = () => {
      let getSearchArrayList: goodsList[] = [];
      if (data.goodsFormInt.title) {
        getSearchArrayList = Array.from(
          new Set(FilterSearchItems(data.goodsFormInt.title))
        );
      } else if (data.goodsFormInt.introduce) {
        getSearchArrayList = Array.from(
          new Set(FilterSearchItems(data.goodsFormInt.introduce))
        );
      } else {
        getSearchArrayList = Array.from(new Set(FilterSearchItems()));
      }
      console.log(getSearchArrayList);
      handlePagerCut(
        1,
        100,
        getSearchArrayList
      );
      data.goodsFormInt.total = getSearchArrayList.length;
    };
    const FilterSearchItems = (values: string = "") => {
      let searchTitleArr: goodsList[] = []; //定义数组，用来接受查询过后要展示的数据
      if (data.goodsFormInt.title) {
        searchTitleArr = data.goodsRows.filter((item) => {
          return item.title.indexOf(values) !== -1;
        });
      } else if (data.goodsFormInt.introduce) {
        searchTitleArr = data.goodsRows.filter((item) => {
          return item.introduce.indexOf(values) !== -1;
        });
      } else {
        searchTitleArr = [
          ...(searchTitleArr = data.goodsRows.filter((item) => {
            return item.title.indexOf(values) !== -1;
          })),
          ...(searchTitleArr = data.goodsRows.filter((item) => {
            return item.introduce.indexOf(values) !== -1;
          })),
        ];
      }
      return searchTitleArr;
    };
    FilterSearchItems();
    // 重置按钮
    const resetForm = () => {
      data.goodsFormInt.title = "";
      data.goodsFormInt.introduce = "";
      getList();
    };
    //对数据进行分页处理
    const handlePagerCut = (
      pageNum: number = 1,
      pageSize: number = 10,
      ArrayList: goodsList[] = []
    ) => {
      console.log(pagination(pageNum, pageSize, ArrayList));
      data.handleList = pagination(pageNum, pageSize, ArrayList);
    };
    /***
     * 点击搜索后需要对搜索后的数组进行分页时不能使用如下函数
     * 
     */
    // 每页多少条切换
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`);
      data.goodsFormInt.pageSize = val;
      handlePagerCut(
        data.goodsFormInt.pageNum,
        data.goodsFormInt.pageSize,
        data.goodsRows
      );
    };
    // 第几页数据
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`);
      console.log(`${val} items per page`);
      data.goodsFormInt.pageNum = val;
      handlePagerCut(
        data.goodsFormInt.pageNum,
        data.goodsFormInt.pageSize,
        data.goodsRows
      );
    };
    return {
      ...toRefs(data),
      resetPageReq,
      resetForm,
      handleSizeChange,
      handleCurrentChange,
      handlePagerCut,
    };
  },
});
</script>

<style scoped lang="scss"></style>
