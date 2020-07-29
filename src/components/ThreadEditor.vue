<template>
     <div class="col-full push-top">
          <form @submit.prevent="save">
              <div class="form-group">
                <label for="thread_title">Title:</label>
                <input type="text" 
                id="thread_title" 
                class="form-input" 
                name="title" 
                v-model="form.title">
              </div>

              <div class="form-group">
                <label for="thread_content">Content:</label>
                <textarea 
                id="thread_content" 
                class="form-input" 
                name="content" 
                rows="8" 
                cols="140"
                v-model="form.text"
                
                ></textarea>
              </div>

              <div class="btn-group">
                <button @click="cancel" class="btn btn-ghost">Cancel</button>
                <button class="btn btn-blue" type="submit" name="Publish">{{isUpdate ? 'Update' : 'Publish'}} </button>
              </div>
          </form>
      </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                title:this.title,
                text:this.text
            }
        }
    },
    props:{
        title:{
            type:String,
            default:''
        },
        text:{
            type:String,
            default:''
        }
    },
    methods:{
        save(){
            this.$emit('save',{title:this.form.title,text:this.form.text})
        },
        cancel(){
            this.$emit('cancel')
        }
    },
    computed:{
        isUpdate(){
            return !!this.title
        }
    }
}
</script>