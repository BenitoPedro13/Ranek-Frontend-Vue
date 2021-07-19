<template>
  <div v-if="vendas">
    <h2>Vendas</h2>
    <div class="produtos-wrapper" v-for="(venda, index) in vendas" :key="index">
      <produtos-item v-if="venda.produto" :produto="venda.produto">
        <p class="comprador">
          <span>Comprador: </span> {{venda.email}}
        </p>
      </produtos-item>
      <div class="entrega">
        <h3>Entrega:</h3>
        <ul v-if="venda.endereco">
          <li v-for="(value, key) in venda.endereco" :key="key">
            {{key}}: {{value}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ProdutosItem from '@/components/ProdutosItem.vue'
import {api} from '@/services.js'
import { mapState } from 'vuex'

export default {
  name: 'UsuarioVendas',
  data() {
    return {
      vendas: null,
    }
  },
  components: {
    ProdutosItem
  },
  methods: {
    async getVendas() {
      const token = this.usuario.token
      const vendasJson = await api.get(`/transacao?vendedor_id=${this.usuario.id}`,
      Object.assign({}, {'headers': {'x-access-token': `${token}`}}))
      this.vendas = vendasJson.data
    }
  },
  computed: {
    ...mapState(['usuario', 'login'])
  },
  watch: {
    login() {
      this.getVendas()
    }
  },
  created() {
    if(this.login){
      this.getVendas()
    }
  }
}
</script>

<style scoped>

.produto-wrapper {
  margin-bottom: 40px;
}

.comprador span {
  color: #e80
}

.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  justify-self: end;
  margin: 0;
}

</style>