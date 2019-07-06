import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import modules from './modules'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules
})
