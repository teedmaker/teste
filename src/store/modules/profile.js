import { computed } from 'vue'
import { createStore } from 'vuex'

export default createStore({
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    appendSaldo(state, saldo) {
      state.user.saldo += saldo
    },
    substractSaldo(state, saldo) {
      if (state.user.saldo < saldo) {
        return;
      }
      state.user.saldo -= saldo
    },
    setSaldo(state, saldo) {
      state.user.saldo = saldo
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    appendSaldo({ commit }, saldo) {
      commit('appendSaldo', saldo)
    },
    substractSaldo({ commit }, saldo) {
      commit('substractSaldo', saldo)
    },
    setSaldo({ commit }, saldo) {
      commit('setSaldo', saldo)
    }
  },
})
