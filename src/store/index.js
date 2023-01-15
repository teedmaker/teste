import { createStore } from 'vuex'

import profile from './modules/profile'

export default createStore({
  modules: {
    profile
  },
  state: {
    isLoading: true,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    setIsLoading({ commit }, isLoading) {
      commit('setIsLoading', isLoading)
    }
  }
})
