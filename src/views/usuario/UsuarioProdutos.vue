<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <produtos-adicionar></produtos-adicionar>
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <p>{{produto.descricao}}</p>
      </li>
    </transition-group>
    {{usuario_produtos}}
  </section>
</template>

<script>
import ProdutosAdicionar from '@/components/ProdutosAdicionar.vue'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'UsuarioProdutos',
  components: {
    ProdutosAdicionar
  },
  methods: {
    ...mapActions(['getUsuarioProdutos']),
  },
  computed: {
    ...mapState(['login', 'usuario','usuario_produtos'])
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

<style>

</style>