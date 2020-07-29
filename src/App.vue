<template>
   <div >
     <TheHeader/>
     <div class="container">
        <router-view v-show="showPage" @ready="showPage=true"/>
        <AppSpinner v-show="!showPage" />
     </div>   
    </div> 
</template>

<script>
import TheHeader from './components/TheHeader'
import AppSpinner from './components/AppSpinner'
export default {
  name: 'App',
  components:{
    TheHeader,
    AppSpinner
  },
  data(){
    return{
      showPage:false
    }
  },
  created(){
    this.$router.beforeEach((to,from,next)=>{
      this.showPage=false;
      next()
    })
  }
}
</script>

<style>
@import "assets/css/style.css";
</style>
