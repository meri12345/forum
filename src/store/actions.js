import firebase from 'firebase'
export const actions={
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
    createUser({state,commit},{id, email,username,name,avatar=null}){
        return new Promise((resolve,reject)=>{
            const registeredAt=Math.floor(Date.now()/1000)
            const usernameLower = username.toLowerCase()
            email = email.toLowerCase()
            const user = {name,username,email,avatar,registeredAt,usernameLower}
            firebase.database().ref('users').child(id).set(user)
            .then(()=>{
                commit('addItem',{resource:'users',id:id,item:user})
                resolve(state.users[id])
            })

        })
    },

    registerUserWithEmailAndPassword({dispatch,state,commit},{email,name,username,password,avatar=null}){
        return firebase.auth().createUserWithEmailAndPassword(email,password)
     .then((user)=>{
         return  dispatch('createUser',{email,name,username,password,avatar,id:user.user.uid})
                 
     }) 
     
    },

    fetchAuthUser({dispatch,commit}){
        const userId = firebase.auth().currentUser.uid
        return dispatch('fetchUser',{id:userId})
        .then(()=>{
            commit('setAuthUser',userId)
        })
    },

    signInWithEmailAndPassword({commit,dispatch,state},{email,password}){
        return firebase.auth().signInWithEmailAndPassword(email,password)
    },

    signOut({commit}){
        return firebase.auth().signOut()
        .then(()=>{
            commit('setAuthUser',null)
        })
    },

    initAuthentication({dispatch,commit,state}){
        return new Promise((resolve,reject)=>{
            if(state.unsibscribeAuthObserver){
                state.unsibscribeAuthObserver()
            }
          const unsubscribe = firebase.auth().onAuthStateChanged(user=>{
                if(user){
                   
                  dispatch('fetchAuthUser')
                  resolve(user)
                  
                }
                else{
                    resolve(null)
                }
              })
              commit('setUnsibscribeAuthObserver',unsubscribe)
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