<template>
     <div v-if="asyncDataReady_ready" class="col-large push-top">
        
        <h1>{{thread.title}}</h1>  
          <p>
              By <a href="#" class="link-unstyled">{{user.name}}</a> <AppDate :timestamp="thread.publishedAt"/>.
              <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{repliesCount}} replies by {{contributorsCount}} contributors</span>
          </p> 
        <router-link tag="button" class="btn-green btn-small" :to="{name:'ThreadEdit',id:this.id}">Edit</router-link> 
        <PostList :posts="posts"/>      
        <PostEditor v-if="authUser" :threadId="id"/>
        <div v-else>
            <router-link :to="{name:'signIn',query:{redirectTo:$route.path}}">Sign in</router-link> or <router-link :to="{name:'Register'}">Register</router-link> to post reply.
        </div>
      </div>
</template>

<script>
import PostList from '../components/PostList'
import PostEditor from '../components/PostEditor'
import AppDate from '../components/AppDate'
import firebase from 'firebase'
import {countObjectProperties} from '../utilis/index'
import asyncDataStatus from '../mixins/asyncDataStatus'
import {mapGetters} from 'vuex'

export default {
    props:{
        id:{
            required:true,
            type: String
        }
    },
    mixins:[asyncDataStatus],
    components:{
        PostList,
        PostEditor,
        AppDate
    },
    computed:{
        ...mapGetters(['authUser']),
        thread(){
            return this.$store.state.threads[this.id]
            
        },
        user(){
            return this.$store.state.users[this.thread.userId]
        },
        posts(){
            const postIds= Object.keys(this.thread.posts);
            return Object.values(this.$store.state.posts).filter(post=>{
                return postIds.includes(post['.key'])
            })
        },
        repliesCount(){
            return this.$store.getters.threadRepliesCount(this.id)
        },
        contributorsCount(){
            return countObjectProperties(this.thread.contributors)
        }
    },
    created(){
            this.$store.dispatch('fetchThread',{id: this.id})
            .then(thread=>{
                 this.$store.dispatch('fetchUser',{id: thread.userId})

                 return this.$store.dispatch('fetchPosts',{ids:Object.keys(thread.posts)})             
            })
            .then(posts=>{
                    return Promise.all(posts.map(post=>{
                   this.$store.dispatch('fetchUser',{id:post.userId})

                     }))
                 })    
                 .then(()=>{
                     this.fetched()
                 })
       
    }
}
</script>

<style scoped>

</style>