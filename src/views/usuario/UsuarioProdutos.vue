<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <produtos-adicionar></produtos-adicionar>
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="produto in usuario_produtos" :key="produto.id">
        <produtos-item :produto="produto">
          <p class="descricao">{{produto.descricao}}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">Deletar</button>
        </produtos-item>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutosAdicionar from '@/components/ProdutosAdicionar.vue'
import ProdutosItem from '@/components/ProdutosItem.vue'
import {mapState, mapActions} from 'vuex'
import {api} from '@/services.js'

export default {
  name: 'UsuarioProdutos',
  components: {
    ProdutosAdicionar,
    ProdutosItem,
  },
  methods: {
    ...mapActions(['getUsuarioProdutos']),
    async deletarProduto(id) {
      try {
        const confirmar = window.confirm('Deseja remover este produto?')
        if(confirmar){
          await api.delete(`/produto/${id}`)
          this.getUsuarioProdutos()
        }
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  computed: {
    ...mapState(['login', 'usuario', 'usuario_produtos'])
  },
  watch: {
    login() {
      this.getUsuarioProdutos()
    }
  },
  created(){
    if(this.login){
      this.getUsuarioProdutos()
    }
  },
}
</script>

<style scoped>

h2 {
  margin-bottom: 20px;
}

.list-enter, .list-leave-to {
  opacity: 1;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url('../../assets/remove.svg') no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}

</style>