<template>
    <div class="col-full">
          <div class="thread-list">
              <h2 class="list-title">Threads</h2>
                  <ThreadListItem  v-for="thread in threads" :key="thread['.key']" :thread="thread"/>
          </div>
    </div>
</template>

<script>
import ThreadListItem from './ThreadListItem'
export default {
    components:{
        ThreadListItem:ThreadListItem
    },
    props:{
        threads:{
            type:Array,
            required:true
        }
    }
}
</script>

<style scoped>


</style>