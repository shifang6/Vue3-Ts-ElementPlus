<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside>
          <!-- <MenuList /> -->
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import MenuList from "@/components/MenuList.vue";

export default defineComponent({
  components:{
    MenuList
  },
  setup() {
    const routers = useRouter();
    console.log(routers.getRoutes());
    return { routers };
  }
});
</script>

<style lang="scss" scoped>
</style>