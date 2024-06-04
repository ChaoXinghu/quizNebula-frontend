<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :default-selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="titleBar">
            <img class="logo" src="../assets/答案.png" />
            <div class="title">鱼答答</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="loginUserStore.loginUser.id">
        {{ loginUserStore.loginUser.userName ?? "无名" }}
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login"> 登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/store/access/checkAccess";

const router = useRouter();
//用户信息全局状态管理
const loginUserStore = useLoginUserStore();
//当前选中菜单项
const selectedkeys = ref(["/"]);
//路由跳转时，自动更新菜单中的选项
router.afterEach((to, from, failure) => {
  selectedkeys.value = [to.path];
});
//展示到菜单栏中的路由数组
const visibleRoutes = routes.filter((item) => {
  if (item.meta?.hideInMenu) {
    return false;
  }
  //根据权限过滤菜单
  if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
    return false;
  }
  return true;
});
//点击菜单跳转到对应页面
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>
<style scoped>
#globalHeader {
}

.titleBar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
  color: black;
}
</style>
