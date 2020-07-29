<template>
     <div v-if="asyncDataReady_ready"  class="col-full push-top">

          <h1>Editing <i>{{thread.title}}</i></h1>

        <ThreadEditor
        :title="thread.title"
        :text="text"
        @save="save"
        @cancel="cancel"/>
        
      </div>
</template>

<script>
import ThreadEditor from '../components/ThreadEditor'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {
    props:{
        id:{
            type:String,
            required:true
        }
    },
    mixins:[asyncDataStatus],
    methods:{
        save({title,text}){
            this.$store.dispatch('updateThread',{
                text,
                title,
                id:this.id
            }).then((thread)=>{
                this.$router.push({name:'ThreadShow',params:{id:this.id}})
            })
  },
  cancel(){
      this.$router.push({name:'ThreadShow',params:{id:this.id}})
  }
    },
    computed:{
        thread(){
            return this.$store.state.threads[this.id]
        },
        text(){
            const post = this.$store.state.posts[this.thread.firstPostId]
            return post? post.text : null
        }
    },
    components:{
        ThreadEditor
    },
    created(){
        this.$store.dispatch('fetchThread',{id:this.id})
        .then(thread=>{
            this.$store.dispatch('fetchPost',{id:thread.firstPostId})
        })
        .then(()=>{
            this.fetched()
        })
    }
}
</script>