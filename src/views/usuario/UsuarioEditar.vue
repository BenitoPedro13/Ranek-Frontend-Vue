<template>
  <section>
    <h2>Editar Usuario</h2>
    <usuario-form>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuario</button>
    </usuario-form>
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue'
import {api} from '@/services.js'

export default {
  name: 'UsuarioEditar',
  components: { UsuarioForm },
  methods: {
    async atualizarUsuario(){
      try {
        const token = this.$store.state.usuario.token
        await api.put(`/usuario/${this.$store.state.usuario.id}`, this.$store.state.usuario,
        Object.assign({}, {headers: {['x-access-token']: token}}))
        await this.$store.dispatch('getUsuario', this.$store.state.usuario)
        this.$router.push({name: 'usuario'})
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
  
  h2 {
    margin-bottom: 20px;
  }

</style>