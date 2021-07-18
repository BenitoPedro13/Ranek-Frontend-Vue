<template>
  <div class="login">
      <h1 v-if="success !== false">Login</h1>
      <h1 v-else>Algo deu errado...</h1>
      <form action="">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model="login.email">
          <label for="senha">Senha</label>
          <input type="password" name="senha" id="senha" v-model="login.senha">
          <button class="btn" @click.prevent='logar'>Logar</button>
      </form>
      <p class="perdeu">
          <a href="/" target="_blank">perdeu a senha? Clique aqui.</a>
      </p>
      <login-criar></login-criar>
  </div>
</template>

<script>
import LoginCriar from '../components/LoginCriar.vue'

export default {
    name: 'Login',
    components: {
        LoginCriar
    },
    data() {
        return {
            login: {
                email: '',
                senha: '',
            },
            success: null,
        }
    },
    methods: {
        async logar() {
            const response = await this.$store.dispatch('logarUsuario', this.login)

            if(response){
                this.success = true
                this.$router.push({name: 'usuario'}) 
            }
            else {
                this.success = false
            }
        },
    }
}
</script>

<style scoped>

.login {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
}

h1 {
    text-align: center;
    font-size: 2rem;
    margin-top: 40px;
    color: #87f;
}

form {
    display: grid;
}

.btn {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
}

.perdeu {
    text-align: center;
    margin: 20px auto 0 auto;
}

.perdeu:hover {
    color: #87f;
    text-decoration: underline;
}

</style>