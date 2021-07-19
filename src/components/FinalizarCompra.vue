<template>
  <section>
      <h2>Endereço de Envio</h2>
      <usuario-form>
          <button @click.prevent="finalizarCompra" class="btn">Finalizar Compra</button>
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
            const token = this.usuario.token
            const response = await api.post('/transacao', this.compra, Object.assign({}, {'headers': {'x-access-token': `${token}`}}))
            this.$router.push({name: 'compras'})
            return response
        },
        async criarUsuario() {
            try {
                await this.$store.dispatch('criarUsuario', this.$store.state.usuario)
                await this.$store.dispatch('getUsuario', this.$store.state.usuario)
                await this.criarTransacao()
            } catch (error) {
                console.error(error)
            }
        },
        async finalizarCompra() {
            if(this.$store.state.login){
                await this.criarTransacao()
            }
            else {
                await this.criarUsuario()
            }
            
        },
        async redirect(link, target = '_blank') {
            await this.finalizarCompra()
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