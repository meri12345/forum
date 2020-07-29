<template>
  <div v-if="asyncDataReady_ready" class="push-top col-full">
     <h1>Welcome!</h1>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList'
import asyncDataStatus from '../mixins/asyncDataStatus'
export default {
  name: 'HelloWorld',
  components:{
    CategoryList
  },
  mixins:[asyncDataStatus],

  computed:{
    categories(){
      return Object.values(this.$store.state.categories)
    }
  },
  beforeCreate(){
    this.$store.dispatch('fetchAllCategories')
    .then(categories=>
      Promise.all(categories.map(category=>this.$store.dispatch('fetchForums',{ids:Object.keys(category.forums)}))))
      .then(()=>{
        this.fetched()
      })
  }
}
</script>

<style scoped>
</style>
