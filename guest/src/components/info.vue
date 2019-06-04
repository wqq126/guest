<template>
 <div class="page">
<el-form  :model="form" ref="regionForm" label-width="100px" class="region-form">
      <el-form-item label="用户名:" prop="name">
        <el-input readonly="readonly" v-model.trim="form.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="密码:" prop="userPassword">
        <el-input type="password" v-model="form.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item> -->
      <el-form-item label="密码提示:" prop="passwordQuestion">
        <el-input readonly="readonly" v-model.trim="form.passwordQuestion"></el-input>
      </el-form-item>
      <el-form-item label="密码回答:" prop="passwordAnswer">
        <el-input readonly="readonly" v-model.trim="form.passwordAnswer"></el-input>
      </el-form-item>
      <el-form-item label="头像:" prop="passwordAnswer">

          <img width="190" height="260" :src="imageUrl" class="avatar">
      </el-form-item>
      <el-form-item  label="性别:" prop="userSex">
        <el-radio :disabled="true" v-model="form.userSex" label="1">男</el-radio>
        <el-radio :disabled="true" v-model="form.userSex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item  label="电子邮件:" prop="userEmail">
        <el-input readonly="readonly" v-model.trim="form.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="qq:" prop="userQQ">
        <el-input readonly="readonly" v-model.trim="form.userQQ"></el-input>
      </el-form-item>
      <!-- <el-form-item label="验证码:" prop="code">
        <el-input style="width:calc(100% - 140px)" v-model.trim="form.code"></el-input>
        <img @click="getCode" class="code-img" :src="code" alt>
      </el-form-item> -->

      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm('regionForm')">立即创建</el-button>
        <el-button @click="resetForm('regionForm')">重置</el-button>
      </el-form-item> -->
    </el-form>
 </div>
</template>

<script type="text/ecmascript-6">
import store from '../vuex/store'
export default {
 name:"",
 data() {
 return {
   imageUrl: "",
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
 }
 },
 mounted(){
   this.getInfo();
 },
 components: {

 },
 methods: {
   getInfo(){
     this.https({
       url:'/user',
       type:'get',
       data:{
         name:localStorage.getItem('name')
       }
     }).then(res=>{
       var data = res.data;
       this.form.name = data.name;
       this.form.passwordQuestion = data.password_question;
       this.form.passwordAnswer = data.password_answer;
       this.form.userQQ = data.qq;
       this.form.userEmail = data.email;
       this.form.userSex = data.sex+'' ;

       if(data.face){
         this.imageUrl = store.state.baseUrl+'/data'+data.face;
       }else{
        this.imageUrl = require('../../static/img/defaultphoto.png')
       }
     },err=>{

     })
   }
 }
}
</script>

<style scoped>
.region-form{
position: relative;
  top: 20px;
}
</style>
