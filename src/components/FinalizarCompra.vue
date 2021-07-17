<template>
  <section>
      <h2>Endereço de Envio</h2>
      <usuario-form>
          <a @click="redirect(`https://wa.me/5521965778659?text=${mensagem}`)" class="btn">Finalizar Compra</a>
      </usuario-form>
  </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue'
import {api} from '@/services.js'
import {mapState} from 'vuex'

export default {
    name: 'FinalizarCompra',
    components: {
        UsuarioForm,
    },
    props: ['produto', 'mensagem'],
    computed: {
        ...mapState(['usuario']),
        compra() {
            return {
                comprador_id: this.usuario.id,
                vendedor_id: this.produto.usuario_id,
                produto: this.produto,
                endereco: {
                    cep: this.usuario.cep,
                    rua: this.usuario.rua,
                    numero: this.usuario.numero,
                    bairro: this.usuario.bairro,
                    cidade: this.usuario.cidade,
                    estado: this.usuario.estado
                }
            }
        }
    },
    methods: {
        async criarTransacao() {
            const response = await api.post('/transacao', this.compra)
            this.$router.push({name: 'compras'})
            return response
        },
        async criarUsuario() {
            try {
                await this.$store.dispatch('criarUsuario', this.$store.state.usuario)
                await this.$store.dispatch('getUsuario', this.$store.state.usuario.email)
                await this.criarTransacao()
            } catch (error) {
                console.error(error.message)
            }
        },
        finalizarCompra() {
            if(this.$store.state.login){
                this.criarTransacao()
            }
            else {
                this.criarUsuario()
            }
            
        },
        redirect(link, target = '_blank') {
            window.open(link, target);
        }

    }
}
</script>

<style scoped>

h2 {
    margin-top: 40px;
    margin-bottom: 20px;
}

.btn {
    background: #e80;
}

</style>