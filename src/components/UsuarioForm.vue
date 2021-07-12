<template>
  <form>

      <div v-if="mostrarDadosLogin" class="usuario">
        <label for="nome">Nome</label>
        <input v-model="nome" type="text" name="nome" id="nome">
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" id="email">
        <label for="senha">Senha</label>
        <input v-model="senha" type="password" name="senha" id="senha">
      </div>

      <label for="cep">Cep</label>
      <input @keyup="preencherCep" v-model="cep" type="text" name="cep" id="cep">
      <label for="rua">Rua</label>
      <input v-model="rua" type="text" name="rua" id="rua">
      <label for="numero">Numero</label>
      <input v-model="numero" type="number" name="numero" id="numero">
      <label for="bairro">Bairro</label>
      <input v-model="bairro" type="text" name="bairro" id="bairro">
      <label for="nome">Cidade</label>
      <input v-model="cidade" type="text" name="cidade" id="cidade">
      <label for="nome">Estado</label>
      <input v-model="estado" type="text" name="estado" id="estado">
      <div class="button">
          <slot></slot>
      </div>
  </form>
</template>

<script>
import {mapFields} from '../helpers.js'
import {getCep} from '../services.js'

export default {
    name: 'UsuarioForm',
    computed: {
        ...mapFields({
            fields: ['nome', 'email', 'senha', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
            base: 'usuario',
            mutation: 'UPDATE_USUARIO'
        }),
        mostrarDadosLogin(){
            return !this.$store.state.login || this.$route.name === 'usuario-editar'
        }
    },
    methods: {
        async preencherCep() {
            const cep = this.cep.replace(/\D/g, '')
            if(cep.length === 8){
                const cepJson = await getCep(cep)
                this.rua = cepJson.data.logradouro
                this.bairro = cepJson.data.bairro
                this.estado = cepJson.data.uf
                this.cidade = cepJson.data.localidade
            }
        }
    }
}
</script>

<style scoped>

form, .usuario {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
}

.usuario {
    grid-column: 1 / 3;
}

.button {
    grid-column: 2;
    margin-top: 10px;
}

</style>