<template>
  <div id="userLoginPage">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input v-model="form.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useLoginUserStore } from "../../store/userStore";
import message from "@arco-design/web-vue/es/message";
import { userLoginUsingPost } from "@/api/userController";
import API from "@/api";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as API.UserLoginRequest);

const router = useRouter();
const loginUserStore = useLoginUserStore();

const handleSubmit = async () => {
  const res = await userLoginUsingPost(form);
  //登录成功，跳转主页
  if (res.data.code === 0) {
    await loginUserStore.fetchLoginUser();
    message.success("登录成功");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败," + res.data.message);
  }
};
</script>

<style scoped></style>
