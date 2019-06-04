<template>
  <el-dialog
    title="修改密码"
    width="624px"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    :show-close="false"
    center
    :close-on-press-escape="false"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:520px"
    >
      <el-form-item label="旧密码:" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="oldPassword">
        <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clsoe('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  props: {
    dialogShow: {
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        password: "",
        oldPassword:''
      },
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码"
          }
        ],
        oldPassword:[
          {
            required: true,
            message: "请输入原密码"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    clsoe(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close", "passwordDialog");
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.https({
            url: "/update/password",
            type: "post",
            data: {
              id:localStorage.getItem('id'),
              password: this.ruleForm.password,
              oldPassword:this.ruleForm.oldPassword
            }
          }).then(
            res => {
              this.$message({
                message: '修改成功，请重新登录',
                type: "success"
              });
              setTimeout(()=>{
                this.$router.push('/');
              },2000)
            },
            err => {
              this.$message({
                message: err.message,
                type: "warning"
              });
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
