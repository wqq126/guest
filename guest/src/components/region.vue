<template>
  <div class="page">
    <el-form :rules="rules" :model="form" ref="regionForm" label-width="100px" class="region-form">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="userPassword">
        <el-input type="password" v-model="form.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="密码提示:" prop="passwordQuestion">
        <el-input v-model.trim="form.passwordQuestion"></el-input>
      </el-form-item>
      <el-form-item label="密码回答:" prop="passwordAnswer">
        <el-input v-model.trim="form.passwordAnswer"></el-input>
      </el-form-item>
      <el-form-item label="头像:" prop="passwordAnswer">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          type="post"
          :action="action"
          :data="form"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :with-credentials='true'
          accept=".jpg, .png"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别:" prop="userSex">
        <el-radio v-model="form.userSex" label="1">男</el-radio>
        <el-radio v-model="form.userSex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="电子邮件:" prop="userEmail">
        <el-input v-model.trim="form.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="qq:" prop="userQQ">
        <el-input v-model.trim="form.userQQ"></el-input>
      </el-form-item>

      <el-form-item label="验证码:" prop="code">
        <el-input style="width:calc(100% - 140px)" v-model.trim="form.code"></el-input>
        <img @click="getCode" class="code-img" :src="code" alt>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('regionForm')">立即创建</el-button>
        <el-button @click="resetForm('regionForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import store from "../vuex/store";
export default {
  name: "",
  data() {
    var checkConfigPassword = (rule, value, callback) => {
      setTimeout(() => {
        if (value != this.form.userPassword) {
          callback(new Error("确认密码和密码不一致"));
        } else {
          callback();
        }
      });
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      }
      setTimeout(() => {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("邮件格式非法"));
        }
      });
    };
    var checkQQ = (rule, value, callback) => {
      if (!value) {
        callback();
      }
      setTimeout(() => {
        var reg = /[1-9][0-9]{4,}/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的qq"));
        }
      });
    };
    return {
      action: store.state.baseUrl + "/region",
      imageUrl: "",
      code: "",
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 20, message: "长度1~20位", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度6~20位", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度6~20位", trigger: "blur" },
          { validator: checkConfigPassword, trigger: "blur" }
        ],
        passwordQuestion: [
          { required: true, message: "请输入密码提问", trigger: "blur" },
          { min: 6, max: 20, message: "长度6~20位", trigger: "blur" }
        ],
        passwordAnswer: [
          { required: true, message: "请输入密码回到", trigger: "blur" },
          { min: 6, max: 20, message: "长度6~20位", trigger: "blur" }
        ],
        userEmail: [{ validator: checkEmail, trigger: "blur" }],
        userQQ: [{ validator: checkQQ, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      form: {
        name: "",
        userPassword: "",
        confirmPassword: "",
        passwordQuestion: "",
        passwordAnswer: "",
        userSex: "",
        userQQ: "",
        userEmail: "",
        userBlog: "",
        code: ""
      }
    };
  },
  components: {},
  mounted() {
    this.getCode();
  },
  methods: {
    handleChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleSuccess(res,file) {
      this.$refs.upload.clearFiles();
      this.imageUrl = '';
      if (res.errCode != 200) {
        this.$message({
          message: res.message,
          type: "warning"
        });
      } else {
        this.$message({
          message: "注册成功，即将进入登录界面",
          type: "success"
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.imageUrl) {
            this.$refs.upload.submit();
          } else {
            this.https
              ({
                type: "post",
                url: "/region",
                data: this.form
              })
              .then(
                res => {
                  console.log(res);
                  this.$message({
                    message: "注册成功，即将进入登录界面",
                    type: "success"
                  });
                  setTimeout(() => {
                    this.$router.push("/");
                  }, 2000);
                },
                err => {
                  this.$message({
                    message: err.message,
                    type: "warning"
                  });
                  console.log(err);
                }
              );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCode() {
      var timetmp = Date.parse(new Date());
      this.code = store.state.baseUrl +"/captcha.html?rand=" + timetmp;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
