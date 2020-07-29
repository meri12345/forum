<template>
    <form>
            <div class="form-group">
                <textarea name="" id="" cols="30" rows="10" class="form-input" v-model="text"></textarea>
            </div>
            <div class="form-actions">
                <button v-if="isUpdate" @click="cancel" class="btn btn-ghost">Cancel</button>
                <button @click.prevent="save" class="btn-blue">
                    {{isUpdate ? 'Update' : 'Add Post'}}
                </button>
                
            </div>
        </form>  
</template>

<script>
export default {
    data(){
        return{
            text: this.post ? this.post.text : ''
        }   
    },
    computed:{
        isUpdate(){
            return !!this.post
        }
    },
     methods:{
        save(){
            console.log(this.isUpdate)
            if(this.isUpdate){
                this.update();
            }
            else{
                this.create();
            }
        },
        create(){
            const post = {
                text:this.text,
                threadId:this.threadId,
            }
            this.text=''
            this.$store.dispatch('createPost',post)
        },
        update(){
            const payload={
                id:this.post['.key'],
                text:this.text

            }
            this.$store.dispatch('updatePost',payload)
            .then(post=>{
                this.$emit('save',{post})
            })
        },
        cancel(){
            this.$emit('cancel')
        }
    },
    props:{
        threadId:{
            required:false,
            type:String
        },
        post:{
            type:Object
        }
    }
}
</script>