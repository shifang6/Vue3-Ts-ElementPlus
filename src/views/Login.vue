<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="姓名" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { loginDate } from "@/types/login";
import { inputInfoData } from "@/types/inputTypes";
import type { FormInstance } from "element-plus";
import { LoginApi } from "@/api/login";
import { setToken, getToken } from "@/utils/auth";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    /*****
     * https://segmentfault.com/q/1010000042477736
     * 所有的导航现在都是异步的 所有的导航，包括第一个导航，现在都是异步的
      所以在组件挂在的时候需要确保路由已经加载
     * 
     */
    const userRouter = useRouter();
    const data = reactive(new loginDate());
    const rules = reactive(new inputInfoData());
    // 处理登录过程
    const ruleFormRef = ref<FormInstance>();
    // 提交
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log(data.ruleForm);
          LoginApi(data.ruleForm).then((res) => {
            // console.log(res.token);
            setToken(res.token);
            if (getToken()) {
              userRouter.push({
                path: "/home",
              });
            }
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    // 重置
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    // 返回值
    return {
      ...toRefs(data),
      ...toRefs(rules),
      ruleFormRef,
      submitForm,
      resetForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
