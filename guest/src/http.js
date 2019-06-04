import $ from 'jquery'
import store from './vuex/store'
import Vue from 'vue'
import Router from 'vue-router'
export function myAjax(options) {
  var _this = new Vue();
  var dtd = $.Deferred();
  var defaultConfig = {
    url: '',
    type: 'get',
    data: {
    },
  }
  var config = $.extend(defaultConfig, options);
  config.data.token = localStorage.getItem('token') || '';
  $.ajax({
    type: config.type,
    url: store.state.baseUrl + config.url,
    data: config.data,

    xhrFields : {
      withCredentials: true
    },
    crossDomain: true,
    success: function (res) {
      var code = res.errCode;
      console.log(_this.VueRoute)
      if(code == 204){
        _this.$message({
          message: res.message,
          type: 'warning'
        });
        setTimeout(()=>{
          // router.push('/');
        },2000)
      }
      if(code == 200){
        dtd.resolve(res);
      }else{
        dtd.reject(res);
      }
    },
    error: function (err) {
      dtd.reject(err)
    }
  })
  return dtd.promise();
}
export default {
  myAjax
}
