// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store'
import routes from './router'
var myAjax = function (options) {
  var _this = this;
  var dtd = $.Deferred();
  var defaultConfig = {
    url: '',
    type: 'get',
    data: {
    },
    processData: true,
    contentType: 'application/x-www-form-urlencoded',
  }
  var config = $.extend(defaultConfig, options);
  config.data.token = localStorage.getItem('token') || '';
  $.ajax({
    type: config.type,
    url: store.state.baseUrl + config.url,
    data: config.data,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    processData: config.processData, //检查数据格式 默认 true
    contentType: config.contentType,
    success: function (res) {
      var code = res.errCode;
      if (code == 204) {
        _this.$message({
          message: res.message,
          type: 'warning'
        });
        setTimeout(() => {
          _this.$router.push('/');
        }, 2000)
      }
      if (code == 200) {
        dtd.resolve(res);
      } else {
        dtd.reject(res);
      }
    },
    error: function (err) {
      dtd.reject(err)
    }
  })
  return dtd.promise();
}
Vue.prototype.https = myAjax;
Vue.config.productionTip = false;

let router = new Router(routes);
Vue.use(Router);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



