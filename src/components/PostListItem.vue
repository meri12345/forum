<template>
<div v-if="post && user" class="post">
            <div class="user-info">
                      <a href="#" class="user-name">{{user.name}}</a>

                      <a href="#">
                          <img class="avatar-large" :src="user.avatar" alt="">
                      </a>

                      <p class="desktop-only text-small">{{userPostCount}}</p>


                  </div>

                  <div class="post-content">
                      <template v-if="!editing">
                        <div >
                        <p>{{post.text}}</p>
                      </div>
                          <a @click.prevent="editing=true" href="#" style="margin-left: auto;" class="link-unstyled" title="Make a change"><i class="fa fa-pencil"></i></a>
                      </template>
                      
                      <div v-else>
                          <PostEditor
                          :post="post"
                          @save="editing=false"
                          @cancel="editing=false"/>
                      </div>
                  </div>


                  <div class="post-date text-faded"> 
                    <div v-if="post.edited" class="edition-info">edited</div>
                    <AppDate :timestamp="this.post.publishedAt "/>
                 </div>
</div>
    
</template>

<script>
import moment from 'moment'
import PostEditor from './PostEditor'
export default {
    props:{
        post:{
            required:true,
            type:Object
        }
    },
    computed:{
        user(){
            return this.$store.state.users[this.post.userId]
        },
        userPostCount(){
            return this.$store.getters.getUserPostCount(this.post.userId)
        }
    },
    components:{
        PostEditor
    },
    data(){
        return{
            editing:false
        }
    }
}
</script>