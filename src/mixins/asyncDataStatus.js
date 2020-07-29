export default{
    data(){
        return{
            asyncDataReady_ready:false
        }
    },
    methods:{
        fetched(){
            this.asyncDataReady_ready=true
            this.$emit('ready')
        }
    }
}