import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '../common/api.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: true,
    user: {
      userId: null,
      userLogin: null
    }
  },
  getters: {
    checkAuth (state) {
      return state.isAuth
    }
  },
  mutations: {
    SET_AUTH (state, userId, userLogin) {
      // const token = JSON.parse(localStorage.getItem('userData')).token

      state.isAuth = true
      state.user.userId = userId
      state.user.userLogin = userLogin
    }
  },
  actions: {
    SET_AUTH (state, payload) {
      return new Promise(resolve => {
        ApiService.post('auth/login', payload)
          .then(({ data }) => {
            const { user, token } = data

            localStorage.setItem('userData', JSON.stringify({ userId: user.userId, token }))

            state.commit('SET_AUTH', user.userId, user.userLogin)

            resolve(data)
          })
          .catch(res => { console.log(res.message) })
      })
    }
  },
  modules: {
  }
})
