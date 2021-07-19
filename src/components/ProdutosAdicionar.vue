<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input type="text" name="nome" id="nome" v-model="produto.nome">
    <label for="preco">Preço (R$)</label>
    <input type="number" name="preco" id="preco" v-model="produto.preco">
    <label for="fotos">Fotos</label>
    <input type="file" name="fotos" id="fotos" ref="fotos">
    <label for="descricao">Descriçao</label>
    <textarea name="descricao" id="descricao" cols="30" rows="10" v-model="produto.descricao">
    </textarea>
    <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto">
  </form>
</template>

<script>
import {api} from '../services.js'

export default {
    name: 'ProdutosAdicionar',
    data() {
      return {
        produto: {
          nome: '',
          preco: '',
          descricao: '',
          fotos: null,
          vendido: 'false',
        }
      }
    },
    methods: {
      formatarProduto() {
        this.produto.usuario_id = this.$store.state.usuario.id
      },
      async adicionarProduto(){
        const token = this.$store.state.usuario.token
        this.formatarProduto()
        await api.post('/produto', this.produto, Object.assign({}, {'headers': {'x-access-token': `${token}`}}))
        this.$store.dispatch('getUsuarioProdutos')
      }
    }
}
</script>

<style scoped>

.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}

</style>