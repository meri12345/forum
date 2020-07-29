<template>
     <div class="forum-list">

              <h2 class="list-title">
                  <router-link tag="a" :to="{name:'Category',params:{id:category['.key']}}">{{category.name}}</router-link>
              </h2>

              <ForumList :forums="categoryForums"/>

          </div>
</template>
<script>
 
import ForumList from './ForumList'
export default {
    props:{
        category:{
            required: true,
            type:Object
        }
    },
    components:{
        ForumList
    },
    computed:{
        categoryForums(){
            return  Object.values(this.$store.state.forums)
            .filter(forum=>{
                return forum.categoryId === this.category['.key']
            })
        }
    }
}
</script>