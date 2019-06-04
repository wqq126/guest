<template>
  <div class="page">
    <el-form :rules="rules" :model="form" ref="regionForm" label-width="100px" class="region-form">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码提示:" prop="passwordQuestion">
        <el-input v-model.trim="form.passwordQuestion"></el-input>
      </el-form-item>
      <el-form-item label="密码回答:" prop="passwordAnswer">
        <el-input v-model.trim="form.passwordAnswer"></el-input>
      </el-form-item>
      <el-form-item label="头像:" prop="passwordAnswer" class="photo-box">
        <img class="preview-photo" :src="imageUrl" alt>
        <el-button class="photo-upload-btn mybtn-primary" type="primary">照片上传</el-button>
        <input
          ref="inputer"
          type="file"
          accept=".jpg, .png"
          class="photo-upload-btn photo-upload-file"
          @change="selectPhoto($event)"
        >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
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
        <el-button type="primary" @click="submitForm('regionForm')">修改</el-button>
        <!-- <el-button @click="resetForm('regionForm')">重置</el-button> -->
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
      uploader: false,
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
        passwordQuestion: "",
        passwordAnswer: "",
        userSex: "",
        userQQ: "",
        userEmail: "",
        userBlog: "",
        code: "",
        photo: ""
      }
    };
  },
  components: {},
  mounted() {
    this.getCode();
    this.getInfo();
  },
  methods: {
    //上传图像选择后
    selectPhoto(ev) {
      var _this = this;
      //获取file对象
      var inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      var file = inputDOM.files[0];
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      _this.imageUrl = url;
      _this.form.photo = file;
      //转base64
      // var file0 = ev.target.files[0];
      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = function(e){
      //   var imageCode = e.target.result;
      //   console.log(imageCode);
      // }
    },
    getInfo() {
      this.https({
        url: "/user",
        type: "get",
        data: {
          name: localStorage.getItem("name")
        }
      }).then(
        res => {
          var data = res.data;
          this.form.name = data.name;
          this.form.passwordQuestion = data.password_question;
          this.form.passwordAnswer = data.password_answer;
          this.form.userQQ = data.qq;
          this.form.userEmail = data.email;
          this.form.userSex = data.sex + "";
          if (data.face) {
            this.imageUrl = store.state.baseUrl + "/data" + data.face;
          } else {
            this.imageUrl = require("../../static/img/defaultphoto.png");
          }
        },
        err => {}
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();
          formData.append('token',localStorage.getItem('token'));
          formData.append('id',localStorage.getItem('id'));
          for (var key in this.form){
            formData.append(key,this.form[key]);
          }
          this.https({
            type: "post",
            url: "/user",
            data: formData,
            processData:false,
            contentType:false
          }).then(
            res => {
              console.log(res);
              this.$message({
                message: "修改成功",
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
.region-form {
  position: relative;
  top: 20px;
}
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
.photo-box {
  height: 207px;
  position: relative;
}

.photo-box img {
  width: 112px;
  height: 167px;
  position: absolute;
  bottom: 30px;
  left: 20px;
  top: 0;
}
.photo-box .best-photo-tip {
  position: absolute;
  left: 180px;
  bottom: 80px;
}
.photo-box .photo-upload-btn {
  position: absolute;
  left: 170px;
  bottom: -130px;
}
.photo-box .photo-upload-file {
  opacity: 0;
  filter: alpha(opacity = 0);
  width: 110px;
  height: 30px;
  left: 180px;
}
</style>
