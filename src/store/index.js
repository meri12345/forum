import Vue from 'vue'
import Vuex from 'vuex'
import {countObjectProperties} from '../utilis/index'
import firebase from 'firebase'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        authId:'7uVPJS9GHoftN58Z2MXCYDqmNAh2',
        categories: {},
        forums: {},
        threads: {},
        users: {},
        posts: {}
    },
    getters:{
        authUser(state){
            return state.users[state.authId]
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
        }
    },
    actions:{
        createPost({commit,state},post){
            console.log(post)
            const postId = firebase.database().ref('posts').push().key
            console.log(postId)
            console.log("KETy")
            post.userId=state.authId
            post.publishedAt = Math.floor(Date.now()/1000)

            const updates={}
            updates[`posts/${postId}`]=post
            updates[`threads/${post.threadId}/posts/${postId}`]=postId
            updates[`threads/${post.threadId}/contributors/${post.userId}`]=post.userId
            updates[`users/${post.userId}/posts/${postId}`]=postId
            firebase.database().ref().update(updates)
            .then(()=>{
                //add post
                commit('addPost',{post:{...post,'.key':postId},postId})
                //append post to thread
                commit('appendPostToThread',{postId,threadId: post.threadId})
                commit('appendContributorToThread',{userId:post.userId,threadId: post.threadId})
                //appdent post to user
                commit('appendPostToUser',{postId,userId: post.userId})
                return Promise.resolve(state.posts[postId])
            })

            

        },
        updatePost({state,commit},{id,text}){
            return new Promise((resolve,reject)=>{
                const post= state.posts[id]
                const edited={
                    at: Math.floor(Date.now()/1000),
                    by:state.authId
                }
                const updates={text,edited}
                firebase.database().ref('posts').child(id).update(updates)
                .then(()=>{
                    commit('addPost',{postId:id, post:{...post,text,edited}})
                    resolve(post)
                })
            })
        },
        updateUser({commit},user){
            commit('saveUser',{user,userId:user['.key']})
        },
        createThread({commit,state,dispatch},{text,title,forumId}){
            return new Promise ((resolve,reject)=>{
                const threadId = firebase.database().ref('threads').push().key
                const userId = state.authId
                const publishedAt = Math.floor(Date.now()/1000)
                const postId = firebase.database().ref('posts').push().key

                const post ={
                    text,
                    publishedAt,
                    threadId,
                    userId
                }

                

                 const thread = {
                     forumId,
                     title,
                     publishedAt,
                     userId,
                     firstPostId:postId,
                     posts:{}
                 }
                 thread.posts[postId]=postId

                 const updates={}
                 updates[`threads/${threadId}`]=thread
                 updates[`forums/${forumId}/threads/${threadId}`]=threadId
                 updates[`users/${userId}/threads/${threadId}`]=threadId

                 updates[`posts/${postId}`]=post
                 updates[`users/${userId}/posts/${postId}`]=postId

                 firebase.database().ref().update(updates)
                 .then(()=>{

                    commit('addThread',{thread:{...thread,'.key':threadId},threadId})
                    commit('appendThreadToForum',{forumId,threadId})
                    commit('appendThreadToUser',{threadId,userId})

                    commit('addPost',{post:{...post,'.key':postId},postId})
                    commit('appendPostToThread',{postId,threadId: post.threadId})
                    commit('appendPostToUser',{postId,userId: post.userId})
                   
                     resolve(state.threads[threadId])
                 })

                 
            })
          
        },
        updateThread({state,commit,dispatch},{title,text,id}){
            console.log("UPDATE")
            return new Promise((resolve,reject)=>{
                const thread = state.threads[id]
                const post= state.posts[thread.firstPostId]

                const edited={
                    at: Math.floor(Date.now()/1000),
                    by:state.authId
                }
                const updates={text,edited}
                updates[`posts/${thread.firstPostId}/text`]=text
                updates[`posts/${thread.firstPostId}/edited`]=edited      
                updates[`threads/${id}/title`]=title                
          
                firebase.database().ref().update(updates)
                .then(()=>{
                    commit('addThread',{thread:{...thread,title},threadId:id})
                    commit('addPost',{postId:thread.firstPostId, post:{...post,text,edited}})

                    resolve(post)
                })
               
            })
             
        },
        fetchCategory({dispatch},{id}){
            return dispatch('fetchItem',{id,resource:'categories'})

            
    },
    fetchForum({dispatch},{id}){
        console.log("FETCH FORUM")
        return dispatch('fetchItem',{id,resource:'forums'})

        
    },
        fetchThread({dispatch},{id}){
            return dispatch('fetchItem',{id,resource:'threads'})

            
    },
    fetchUser({dispatch},{id}){
        console.log(id)
        return dispatch('fetchItem',{id,resource:'users'})

        
    },
    fetchPost({dispatch},{id}){
        return dispatch('fetchItem',{id,resource:'posts'})
        
    },
    fetchItem({commit,state},{id,resource}){
        return new Promise ((resolve,reject)=>{
            firebase.database().ref(resource).child(id).once('value', snapshot=>{
                commit('addItem',{resource, id:snapshot.key, item:snapshot.val()})
                resolve(state[resource][id])
        })
        })
        
    },
    fetchItems({dispatch},{ids,resource}){
      return Promise.all(ids.map(id=>dispatch('fetchItem',{id,resource})))
    },
    fetchPosts({dispatch},{ids}){
        return dispatch('fetchItems',{resource:'posts',ids})
      },
      fetchForums({dispatch},{ids}){
        return dispatch('fetchItems',{resource:'forums',ids})
      },
      fetchUsers({dispatch},{ids}){
        return dispatch('fetchItems',{resource:'users',ids})
      },
      fetchThreads({dispatch},{ids}){
          console.log("THREADS")
        return dispatch('fetchItems',{resource:'threads',ids})
      },
    fetchAllCategories({state,commit}){
        return new Promise((resolve,reject)=>{
            firebase.database().ref('categories').once('value',snapshot=>{
                const categories = snapshot.val()
                Object.keys(categories).forEach(categoryId=>{
                    const category= categories[categoryId]
                    commit('addItem',{resource:'categories',id:categoryId,item:category})
                })
                resolve(Object.values(state.categories))
            })
        })
    }

}
})