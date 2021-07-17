<template>
  <section>
      <div v-if="produto" class="produto">
          <ul v-if="produto.fotos" class="fotos">
              <li v-for="(foto, index) in produto.fotos" :key="index">
                  <img :src="foto.src" :alt="produto.titulo">
              </li>
          </ul>
          <div class="info">
              
              <h1>{{produto.nome}}</h1>
              <p class="preco">{{produto.preco | numeroPreco}}</p>
              <p class="descricao">{{produto.descricao}}</p>
              <transition mode="out-in" v-if="produto.vendido === 'false'">
                  <button class="btn" v-if="!finalizar" @click="comprar">Comprar</button>
                  <finalizar-compra v-else :mensagem="mensagem" :produto="produto"></finalizar-compra>    
              </transition>
              <button class="btn" v-else disabled>Produto Vendido</button>
          </div>
      </div>
      <pagina-carregando v-else></pagina-carregando>
  </section>
</template>

<script>
import PaginaCarregando from '@/components/PaginaCarregando.vue'
import FinalizarCompra from '@/components/FinalizarCompra.vue'
import {api} from '../services.js'

export default {
    name: 'Produto',
    components: {
        PaginaCarregando,
        FinalizarCompra
    },
    data() {
        return {
            id: this.$route.params.id,
            produto: null,
            finalizar: false,
            mensagem: ''
        }
    },
    methods: {
        async getProdutos() {
            const produtoJson = await api.get(`/produto/${this.id}`)
            this.produto = produtoJson.data
        },
        async comprar() {
            this.finalizar = true
            this.mensagem =`Ola, gostaria de fazer um pedido:%0A%2A1x%2A ${this.produto.nome} - ${window.location.href}%0AR$ ${this.produto.preco}%0A%0A%2ATaxa de entrega:%2A Retirar no local%0A%0A%2ATotal:%2A R$ ${this.produto.preco}%0A%0A%0A----------%0A%0A%2ADados do comprador:%2A%0A${this.$store.state.usuario.nome}%0A${this.$store.state.usuario.email}%0A%0A%2AEndereço:%2A%0A${this.$store.state.usuario.rua}, ${this.$store.state.usuario.numero}, ${this.$store.state.usuario.bairro}, ${this.$store.state.usuario.cidade}, ${this.$store.state.usuario.estado}%0A${this.$store.state.usuario.cep}`
        }
    },
    created() {
        this.getProdutos()
    }
}
</script>

<style scoped>

.produto {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    max-width: 900px;
    padding: 60px 20px;
    margin: 0 auto;
}

.preco {
    color: #e80;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 40px;
}

.descricao {
    font-size: 1.2rem;
}

.btn {
    margin-top: 60px;
    width: 200px;
}

.btn[disabled] {
    background: gray;
}

</style>