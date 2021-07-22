<template>
  <form class="adicionar-produto" enctype="multipart/form-data">
    <label for="nome">Nome</label>
    <input type="text" name="nome" id="nome" v-model="produto.nome">
    <label for="preco">Preço (R$)</label>
    <input type="number" name="preco" id="preco" v-model="produto.preco">
    <label for="fotos">Fotos</label>
    <input type="file" @change="imageUpload" name="fotos" id="fotos" ref="fotos">
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
        const headers = { 'Content-Type': 'multipart/form-data', 'x-access-token': `${token}` }
        this.formatarProduto()
        const formData = new FormData()
        formData.append('usuario_id', this.produto.usuario_id)
        formData.append('nome', this.produto.nome)
        formData.append('preco', this.produto.preco)
        formData.append('descricao', this.produto.descricao)
        formData.append('fotos', this.produto.fotos)
        formData.append('vendido', this.produto.vendido)
        await api.post('/produto', formData, {headers})
        this.$store.dispatch('getUsuarioProdutos')
      },
      imageUpload(){
        console.log('fotos: ', this.$refs.fotos.files[0])
        this.produto.fotos = this.$refs.fotos.files[0]
        console.log('foto: ', this.produto.fotos);
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