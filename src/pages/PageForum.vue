<template>
     <div v-if="asyncDataReady_ready" class="container">
      <div class="col-full push-top">
          <div class="forum-header">
              <div class="forum-details">
                  <h1>{{forum.name}}</h1>
                  <p class="text-lead">{{forum.description}}</p>
              </div>
              <router-link :to="{name:'ThreadCreate',params:{forumId:this.forum['.key']}}" class="btn-green btn-small">Start a thread</router-link>
          </div>
      </div>

      <div class="col-full">
            <ThreadList :threads="threads"/>          
      </div>

  </div>
</template>

<script>
import ThreadList from '../components/ThreadList'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {
    components:{
        ThreadList
    },
    mixins:[asyncDataStatus],
    props:{
        id:{
            reqired:true,
            type: String
        }
    },
    computed:{
        forum(){
            return this.$store.state.forums[this.id]
        },
        threads(){
            return Object.values(this.$store.state.threads)
            .filter(thread=>{
                return thread.forumId===this.id
            })
        }
    },
   
    created(){
        this.$store.dispatch('fetchForum',{id:this.id})
        .then((forum)=>this.$store.dispatch('fetchThreads',{ids:Object.keys(forum.threads)}))
        .then((threads)=>Promise.all(threads.map((thread)=>this.$store.dispatch('fetchUser',{id:thread.userId}))))
        .then(()=>{
            this.fetched()
        })
    }
}
</script>