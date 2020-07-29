<template>
    <div v-if="asyncDataReady_ready" class="col-full">
        <h1>{{category.name}}</h1>
        <CategoryListItem :category="category"/>
    </div>
</template>

<script>
import CategoryListItem from '../components/CategoryListItem'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {
    props:{
        id:{
            required:true,
            type:String
        }
    },
    mixins:[asyncDataStatus],
    computed:{
        category(){
            return this.$store.state.categories[this.id]
        }
    },
    components:{
        CategoryListItem
    },
    created(){
        this.$store.dispatch('fetchCategory',{id:this.id})
        .then(category=>this.$store.dispatch('fetchForums',{ids:Object.keys(category.forums)}))
        .then(()=>{
            this.fetched()
        })
    }
}
</script>