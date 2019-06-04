<template>
  <div class="page">
    <header>
      <el-row class="hedaer-row">
        <el-col :span="12" class="header-title">多用户留言系统</el-col>
        <el-col :span="12" class="header-title header-operation">
          欢迎，{{name}}
          <el-dropdown class="more-opteration">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleUpdatePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </header>
    <div class="main">
      <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#187FD3"
      text-color="#fff"
      :router='true'
      active-text-color="#ffd04b">

      <el-menu-item index="/guest/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>


      <el-menu-item index="/guest/blogFriend">
        <i class="el-icon-s-custom"></i>
        <span slot="title">博友</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item-group>
          <template slot="title">账号管理</template>
          <el-menu-item index="/guest/info">个人信息</el-menu-item>
          <el-menu-item index="/guest/EditInfo">修改信息</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="其他管理">
          <el-menu-item index="1-3">短信查询</el-menu-item>
          <el-menu-item index="1-3">好友设置</el-menu-item>
          <el-menu-item index="1-3">鲜花查询</el-menu-item>
          <el-menu-item index="1-3">个人相册</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <div class="view-box">
      <router-view></router-view>
    </div>
    </div>
    <password @close='closeDialog' :dialogShow='passwordDialog'></password>
  </div>
</template>

<script type="text/ecmascript-6">
import password from './dialogs/password'
export default {
  name: "",
  data() {
    return {
      name: localStorage.getItem("name"),
      defaultActive:'/guest/home',
      passwordDialog:false
    };
  },
  components: {
    password
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$message({
        message: "请先登录",
        type: "success"
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    }
  },
  methods: {
    closeDialog(formName){
      this[formName] = false;
    },
    handleUpdatePassword(){
      this['passwordDialog'] = true;
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  }
};
</script>

<style scoped>
.page{
  height: 100%;
}
header {
  height: 70px;
  width: 100%;
  background: #005daa;
}
.hedaer-row {
  height: 100%;
  color: #ffffff;
}
.header-title {
  height: 100%;
  line-height: 70px;
  text-indent: 20px;
  font-size: 20px;
}

.more-opteration {
  color: #ffffff;
}
.header-operation {
  text-align: right;
  padding-right: 20px;
}
.main{
  height: calc(100% - 70px);
}
.el-menu-vertical-demo{
  width: 200px;
  height: 100%;
  float: left;
}
.view-box{
  height: 100%;
  width: calc(100% - 201px);
  float:right;
}
</style>
