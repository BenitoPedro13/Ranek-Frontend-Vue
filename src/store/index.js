import Vue from 'vue'
import Vuex from 'vuex'
import {api} from '../services.js'

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
      estado: '',
      token: '',
    },
    usuario_produtos: null
  },
  getters: {
    
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload)
      const usuario_id = state.usuario.id
      state.usuario.id = payload.id ? payload.email : usuario_id
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload)
    }
  },
  actions: {
    async getUsuarioProdutos(context){
      const produtosJson = await api.get(`/produto?usuario_id=${context.state.usuario.id}`, {
        headers: {
          'x-access-token': context.state.usuario.token,
        }
      })
      context.commit('UPDATE_USUARIO_PRODUTOS', produtosJson.data)
    },
    async getUsuario(context, payload){
      const token = context.state.usuario.token
      const usuarioJson = await api.get(`/usuario/${payload.email}`, Object.assign({}, {headers: {['x-access-token']: token}}))
      context.commit('UPDATE_USUARIO', usuarioJson.data)
      context.commit('UPDATE_LOGIN', true)
      return usuarioJson
    },
    async logarUsuario(context, payload){
      const response = await api.post(`/usuario/logar`, payload)
      if(response.data.login){
        context.commit('UPDATE_USUARIO', response.data.usuario)
        context.commit('UPDATE_LOGIN', true)
        response.data.token ? window.localStorage.setItem("jwt", response.data.token): null
        return true
      }
      return false
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
        estado: '',
        token: ''
      }
      window.localStorage.removeItem("jwt")
      context.commit('UPDATE_USUARIO', defaultUser)
      context.commit('UPDATE_LOGIN', false)
    }
  },
  modules: {
    
  }
})
