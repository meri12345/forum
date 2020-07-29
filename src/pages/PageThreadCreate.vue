<template>
     <div v-if="asyncDataReady_ready" class="col-full push-top">

          <h1>Create new thread in <i>{{forum.name}}</i></h1>

        <ThreadEditor
        @save="save"
        @cancel="cancel"/>
        
      </div>
</template>

<script>
import ThreadEditor from '../components/ThreadEditor'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {
    props:{
        forumId:{
            type:String,
            required:true
        }
    },
    mixins:[asyncDataStatus],
    methods:{
        save({title,text}){
            this.$store.dispatch('createThread',{
                text,
                title,
                forumId:this.forum['.key']
            }).then((thread)=>{
                this.$router.push({name:'ThreadShow',params:{id:thread['.key']}})
            })
  },
  cancel(){
      this.$router.push({name:'Forum', params:{id:this.forum['.key']}})
  }
    },
    computed:{
        forum(){
            return this.$store.state.forums[this.forumId]
        }
    },
    components:{
        ThreadEditor
    },
    created(){
        this.$store.dispatch('fetchForum',{id:this.forumId})
        .then(()=>{
            this.fetched()
        })
    }
}
</script>