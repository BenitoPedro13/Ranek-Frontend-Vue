<template>
  <div v-if="compras">
    <h2>Compras</h2>
    <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
      <produtos-item v-if="compra.produto" :produto="compra.produto">
        <p class="vendedor">
          <span>Vendedor: </span> {{compra.email}}
        </p>
      </produtos-item>
    </div>
  </div>
</template>

<script>
import ProdutosItem from '@/components/ProdutosItem.vue'
import {api} from '@/services.js'
import { mapState } from 'vuex'

export default {
  name: 'UsuarioCompras',
  data() {
    return {
      compras: null,
    }
  },
  components: {
    ProdutosItem
  },
  methods: {
    async getCompras() {
      const token = String(this.usuario.token)
      console.log(token)
      const comprasJson = await api.get(`/transacao?comprador_id=${this.usuario.id}`, Object.assign({}, {"headers": {"x-access-token": `${token}`}}))
      
      this.compras = comprasJson.data
    }
  },
  computed: {
    ...mapState(['usuario', 'login'])
  },
  watch: {
    login() {
      this.getCompras()
    }
  },
  created() {
    if(this.login){
      this.getCompras()
    }
  }
}
</script>

<style scoped>

.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80
}

h2 {
  margin-bottom: 20px;
}

</style>