<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
      <usuario-form v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">Criar Usuario</button>
      </usuario-form>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from './UsuarioForm.vue'

export default {
    name: 'LoginCriar',
    components: {
      UsuarioForm,
    },
    data(){
      return {
        criar: false,
      }
    },
    methods: {
      async criarUsuario() {
        try {
          await this.$store.dispatch('criarUsuario', this.$store.state.usuario)
          await this.$store.dispatch('getUsuario', this.$$store.state.usuario.email)
          this.$router.push({name: "usuario"})
        } catch (error) {
          console.error(error.message)
        }
        
      }
    }
}
</script>

<style scoped>

h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.btn-form {
  max-width: 100%;
}

</style>