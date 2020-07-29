import Vue from 'vue'

export const mutations={
    addPost(state,{post,postId}){
        Vue.set(state.posts,postId,post);

    },
    addItem(state,{item,id,resource}){
        console.log(id)
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
        if(!state.users[userId].posts){
            Vue.set(state.users[userId].posts,'posts',{})
        }
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
}