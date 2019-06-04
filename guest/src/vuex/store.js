import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  baseUrl:'http://192.168.1.81:8085'
}

export default new Vuex.Store({
  state
})
