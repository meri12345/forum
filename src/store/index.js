import Vue from 'vue'
import Vuex from 'vuex'
import {countObjectProperties} from '../utilis/index'
import {actions} from './actions'
import {mutations} from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        authId:null,
        categories: {},
        forums: {},
        threads: {},
        users: {},
        posts: {},
        unsibscribeAuthObserver:null
    },
    getters:{
        authUser(state){
            return state.authId ? state.users[state.authId] : null
        },
        getUserPostCount(state){
            return function(id){
                return countObjectProperties(state.users[id].posts)
            }
        },
        userPosts(state){
               const user = state.users[state.authId]
                console.log(state.users[state.authId])
                if(user.posts){
                    console.log(user.posts)
                    return Object.values(state.posts)
                    .filter(post=>{
                        return post.userId === user['.key']
                        
                    })
                }
                else return []
            
        },
        threadRepliesCount: (state)=> (id)=>{
            return countObjectProperties(state.threads[id].posts)-1
        }        
    },
    mutations,
    actions,
})