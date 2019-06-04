<template>
  <el-dialog
    title="消息发送"
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
      <el-form-item label="接收人:">{{messageData.toName}}</el-form-item>
      <el-form-item label="内容:" prop="detail">
        <el-input
          type="textarea"
          :rows="5"
          maxlength="100"
          show-word-limit
          resize="none"
          v-model="ruleForm.detail"
          autocomplete="off"
        ></el-input>
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
      type: Boolean,
      required: true
    },
    messageData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        detail: ""
      },
      rules: {
        detail: [
          {
            required: true,
            message: "请输入消息内容"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    clsoe(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close", "messageDialog");
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.https({
            url: "/message",
            type: "post",
            data: {
              detail: this.ruleForm.detail,
              formName: this.messageData.formName,
              toName: this.messageData.toName
            }
          }).then(
            res => {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$refs[formName].resetFields();
              this.$emit("close", "messageDialog");
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
