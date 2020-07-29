<template>
    <div class="col-full">
        <h1>Page Not Found</h1>
        <p>Ooops, wrong path. Go <router-link 
        :to="{name:'Home'}"> 
        home </router-link> instead?</p>
    </div>
</template>

<script>
export default {
    created(){
        this.$emit('ready')
    }
}
</script>

<style scoped>
h1{
    font-size: 70px;
}
p{
    font-size: 50px;
}
</style>