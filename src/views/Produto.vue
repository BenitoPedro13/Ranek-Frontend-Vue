<template>
  <section>
      <div v-if="produto" class="produto">
          <ul v-if="produto.fotos" class="fotos">
              <li v-for="(foto, index) in produto.fotos" :key="index">
                  <img src="foto.src" alt="produto.titulo">
              </li>
          </ul>
          <div class="info">
              <h1>{{produto.nome}}</h1>
              <p class="preco">{{produto.preco | numeroPreco}}</p>
              <p class="descricao">{{produto.descricao}}</p>
              <button class="btn" v-if="produto.vendido === 'false'">Comprar</button>
              <button class="btn" v-else disabled>Produto Vendido</button>
          </div>
      </div>
      <pagina-carregando v-else></pagina-carregando>
  </section>
</template>

<script>
import PaginaCarregando from '../components/PaginaCarregando.vue'
import api from '../services.js'

export default {
    name: 'Produto',
    components: {
        PaginaCarregando
    },
    data() {
        return {
            produto: null
        }
    },
    props: ['id'],
    methods: {
        getProdutos() {
            const produtoJson = api.get(`/produto/${this.id}`)
            this.produto = produtoJson
        }
    },
    created() {
        this.getProdutos
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

</style>