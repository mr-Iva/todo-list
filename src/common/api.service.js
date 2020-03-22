import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from 'vue-axios'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    // Vue.axios.defaults.baseURL = 'http://localhost:3000/api/'
  },

  // setHeader () {
  //   Vue.axios.defaults.headers.common['Authorization'] = token
  // },

  post (resource, params) {
    return Vue.axios.post(`http://localhost:3000/api/${resource}`, params)
  }
}

export default ApiService
