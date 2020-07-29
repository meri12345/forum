<template>
    <span :title="timestamp | userFriendlyDate">
                      {{timestamp | relativeDate}}
                 </span>
</template>

<script>
import moment from 'moment'
export default {
    props:{
        timestamp:{
            required:true,
            type:Number
        }
    },
    filters:{
        userFriendlyDate(date){
            return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a')
        },
        relativeDate(date){
            return moment.unix(date).fromNow()
        }
    }
}
</script>