<template>
  <div class="page">
    <el-form :rules="rules" :model="form" ref="regionForm" label-width="100px" class="region-form">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model.trim="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="userPassword">
        <el-input type="password" v-model="form.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="code">
        <el-input style="width:calc(100% - 140px)" v-model.trim="form.code"></el-input>
        <img @click="getCode" class="code-img" :src="code" alt>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('regionForm')">登录</el-button>
        <el-button @click="resetForm('regionForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      code: "",
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 20, message: "长度1~20位", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度6~20位", trigger: "blur" }
        ]
      },
      form: {
        name: "",
        userPassword: "",
        code: ""
      }
    };
  },
  components: {},
  mounted() {
    this.getCode();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.https({
            type: "post",
            url: "/login",
            data: this.form
          }).then(
            res => {
              console.log(res);
              this.$message({
                message: "登录成功",
                type: "success"
              });
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("id", res.data.id);
              setTimeout(() => {
                this.$router.push("/guest");
              }, 2000);
            },
            err => {
              this.$message({
                message: err.message,
                type: "warning"
              });
              this.getCode();
              console.log(err);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCode() {
      var timetmp = Date.parse(new Date());
      this.code = "http://192.168.1.81:8085/captcha.html?rand=" + timetmp;
    }
  }
};
</script>

<style scoped>
.code-img {
  /* position: relative; */
  /* top: 15px; */
  float: right;
}
</style>
