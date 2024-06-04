//多套布局
<template>
  <template v-if="route.path.startsWith('/user')">
    <UserLayout/>
  </template>
  <template v-else>
    <BasicLayout/>
  </template>
</template>
<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";
import UserLayout from "./layouts/UserLayout.vue";

import {useRoute} from "vue-router";
import {getLoginUserUsingGet} from "@/api/userController";
import {useLoginUserStore} from "@/store/userStore";
import {onMounted} from "vue";

const route = useRoute(); //获取当前路由信息

const loginUserStore = useLoginUserStore();
loginUserStore.fetchLoginUser();

const doInit = () => {
  console.log("欢迎使用");
};

onMounted(() => {
  doInit();
});
</script>

<style scoped></style>
