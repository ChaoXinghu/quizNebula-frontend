import router from "@/router";
import { useLoginUserStore } from "@/store/userStore";
import ACCESS_ENUM from "@/store/access/accessEnum";
import checkAccess from "@/store/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore();
  let loginUser = loginUserStore.loginUser;
  console.log("登录用户信息：", loginUser);
  //如果之前没有登陆过，则自动登录
  if (!loginUser || !loginUser.userRole) {
    //等待用户登录成功后，再执行后续代码
    await loginUserStore.fetchLoginUser();
    loginUser = loginUserStore.loginUser;
  }
  //当前用户需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  //要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果没有登录，跳转登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole == ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //若已经登录，但是权限不足，则跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/NoAuth");
      return;
    }
  }
  next();
});
