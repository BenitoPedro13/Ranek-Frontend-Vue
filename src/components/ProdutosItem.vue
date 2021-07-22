<template>
    <div v-if="produto" class="produto">
        <router-link :to="{name: 'produto', params: {id: produto.id}}" class="produto-img">
            <img v-if="produto.fotos.length > 0" :src="produto.fotos[0]" alt="">
            <p>Ver Produto</p> 
        </router-link>
        <div class="info">
            <p class="preco">{{produto.preco | numeroPreco}}</p>
            <h2 class="titulo">{{produto.nome}}</h2>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProdutosItem',
    props: ['produto']
}
</script>

<style scoped>

.produto {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 1fr;
    grid-gap: 20px;
    margin-bottom: 40px;
    position: relative;
}

.info {
    align-self: flex-end;
}

.produto-img {
    border-radius: 4px;
    overflow: hidden;
    height: 100px;
}

</style>