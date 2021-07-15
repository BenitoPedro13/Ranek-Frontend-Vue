<template>
  <section class="produtos-container">
      <transition mode="out-in">
          <div v-if="produtos && produtos.length > 0" class="produtos" key="produtos">
            <div class="produto" v-for="produto in produtos" :key="produto.id">
                <router-link :to="{name: 'produto', params: {id: produto.id}}">
                    <img v-if="produto.fotos[0]" :src="produto.fotos[0]" :alt="produto.fotos[0].titulo">
                    <h2 class="titulo">{{ produto.nome }}</h2>
                    <p class="preco">{{ produto.preco | numeroPreco}}</p>
                </router-link>
                
            </div>
            <produtos-paginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"></produtos-paginar>
          </div>
            
          <div v-else-if="produtos && produtos.length === 0" class="sem-resultados" key="sem-resultados">
            <p>Busca sem resultados, tente buscar outro termo.</p>
          </div>

          <pagina-carregando v-else key="carregando"></pagina-carregando>
      </transition>
      
  </section>
</template>

<script>
import { api } from '../services.js'
import ProdutosPaginar from '../components/ProdutosPaginar.vue'
import { serialize } from '../helpers.js'
import PaginaCarregando from './PaginaCarregando.vue'

export default {
    name: 'ProdutosLista',
    components: {
        ProdutosPaginar,
        PaginaCarregando,
    },
    data() {
        return {
            produtos: null,
            produtosPorPagina: 9,
            produtosTotal: 0,
        }
    },
    methods: {
        async getProdutos() {
            this.produtos = null
            const url = this.url
            const produtosJson = await api.get(url)
            this.produtosTotal = Number(produtosJson.headers['x-total-count'])
            console.log(this.produtosTotal, produtosJson)
            this.produtos = produtosJson.data
        }
    },
    computed: {
        url() {
            const query = serialize(this.$route.query)
            return `/produto?_limit=${this.produtosPorPagina}${query}`
        }
    },
    watch: {
        url() {
            this.getProdutos()
        }
    },
    created() {
        this.getProdutos()
    }
}
</script>

<style scoped>

ul {
    grid-column: 1 / -1;
}

.produtos-container {
    max-width: 1000px;
    margin: 0 auto;
}

.produtos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin: 30px;
}

.produto {
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
    padding: 10px;
    background: #fff;
    border-radius: 4px;
    transition: all 0.2s;
    position: relative;
    z-index: 1;
}

.produto:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
}

.produto img {
    border-radius: 4px;
    margin-bottom: 20px;
}

.titulo {
    margin-bottom: 10px;
}

.preco {
    color: #e80;
    font-weight: bold
}

.sem-resultados {
    text-align: center;
}
</style>