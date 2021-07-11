import Vue from 'vue'
import Vuex from 'vuex'
import api from '../services.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: '',
      nome: '',
      email: '',
      senha: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  },
  getters: {
    
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload)
    },
  },
  actions: {
    async getUsuario(context, payload){
      const usuarioJson = await api.get(`/usuario/${payload}`)
      context.commit('UPDATE_USUARIO', usuarioJson.data)
      context.commit('UPDATE_LOGIN', true)
      return usuarioJson
    },
    async criarUsuario(context, payload) {
      context.commit('UPDATE_USUARIO', {id: payload.email})
      return await api.post('/usuario', payload)
    },
    async deslogarUsuario(context) {
      const defaultUser = {
        id: '',
        nome: '',
        email: '',
        senha: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
      context.commit('UPDATE_USUARIO', defaultUser)
      context.commit('UPDATE_LOGIN', false)
    }
  },
  modules: {
    
  }
})
