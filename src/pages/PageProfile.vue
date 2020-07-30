<template>
    <div v-if="asyncDataReady_ready" class="flex-grid">
         
         <UserProfileCard
         v-if="!edit"
         :user="user"
         :userPostsCount="userPostsCount"
         :userThreadsCount="userThreadsCount"
         />

         <UserProfileCardEditor
         v-else
         :user="user"
         :userPostsCount="userPostsCount"
         :userThreadsCount="userThreadsCount"
         />

          <div class="col-7 push-top">

              <div class="profile-header">
                  <span class="text-lead">
                      {{user.username}}'s recent activity
                  </span>
                  <a href="#">See only started threads?</a>
              </div>

              <hr>

              <PostList :posts="userPosts"/>
          </div>
    </div>
</template>

<script>
import PostList from '../components/PostList'
import { mapGetters } from 'vuex'
import {countObjectProperties} from '@/utilis/index.js'
import UserProfileCard from '../components/UserProfileCard'
import UserProfileCardEditor from '../components/UserProfileCardEditor'
import asyncDataStatus from '../mixins/asyncDataStatus'


export default {
    computed:{
        ...mapGetters({
            'user':'authUser'
        }),
        userPostsCount(){
            return countObjectProperties(this.user.posts)
        },
        userThreadsCount(){
           return countObjectProperties(this.user.threads)
        },
          

        userPosts(){
            return this.$store.getters.userPosts
        }
    },
      mixins:[asyncDataStatus],
    components:{
        PostList,
        UserProfileCard,
        UserProfileCardEditor
    },
    props:{
        edit:{
            type:Boolean,
            default: false
        }
    },
    created(){
        this.$store.dispatch('fetchAuthUser')
        .then(()=>{
        this.$store.dispatch('fetchPosts',{ids:Object.keys(this.user.posts)})
        .then(()=>{
            console.log(this.userPosts)
            this.fetched()
        })
        })
         
        
    }
   
}
</script>