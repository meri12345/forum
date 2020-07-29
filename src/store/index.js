import Vue from 'vue'
import Vuex from 'vuex'
import {countObjectProperties} from '../utilis/index'
import firebase from 'firebase'
import {actions} from './actions'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        authId:null,
        categories: {},
        forums: {},
        threads: {},
        users: {},
        posts: {}
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
        threadRepliesCount: (state)=> (id)=>{
            return countObjectProperties(state.threads[id].posts)-1
        }        
    },
    mutations:{
        addPost(state,{post,postId}){
            Vue.set(state.posts,postId,post);

        },
        addItem(state,{item,id,resource}){
            item['.key']=id;
            Vue.set(state[resource],id,item);

        },
        saveUser(state,{user,userId}){
            Vue.set(state.users,userId,user);
        },
        addThread(state,{thread,threadId}){
            Vue.set(state.threads,threadId,thread);
        },
        appendPostToThread(state,{postId,threadId}){
            if(!state.threads[threadId].posts){
                Vue.set(state.threads[threadId],'posts',{})
            }
            Vue.set(state.threads[threadId].posts,postId, postId)
        },
        appendContributorToThread(state,{userId,threadId}){
            if(!state.threads[threadId].contributors){
                Vue.set(state.threads[threadId],'contributors',{})
            }
            Vue.set(state.threads[threadId].contributors,userId, userId)
        },
        appendPostToUser(state, {postId, userId}){
            Vue.set(state.users[userId].posts, postId, postId) 
        },
        appendThreadToForum(state,{forumId,threadId}){
            if(!state.forums[forumId].threads){
                Vue.set(state.forums[forumId].threads,'threads',{})
            }
            Vue.set(state.forums[forumId].threads,threadId, threadId)
        },
        appendThreadToUser(state,{userId,threadId}){
            if(!state.users[userId].threads){
                Vue.set(state.users[userId].threads,'threads',{})
            }
            Vue.set(state.users[userId].threads,threadId, threadId)
        },
        setAuthUser(state,id){
            state.authId=id
        }
    },
    actions,
})