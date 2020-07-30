<template>
    <div class="container">

      <div class="flex-grid justify-center">
          <div class="col-2">

              <form @submit.prevent="register" action="" class="card card-form">
                  <h1 class="text-center">Register</h1>
                  <div class="form-group">
                      <label for="name">Full Name</label>
                      <input @blur="$v.form.name.touch()" v-model="form.name" id="name" type="text" class="form-input">
                      <template v-if="$v.form.name.$invalid && form.name!=null"> 
                          <span v-if="!$v.form.name.required" class="form-error">This field is required</span>
                      </template>
                  </div>

                  <div class="form-group">
                      <label for="username">Username</label>
                      <input @blur="$v.form.username.touch()" v-model="form.username" id="username" type="text" class="form-input">
                      <template v-if="$v.form.username.$invalid && form.username!=null"> 
                          <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
                      </template>
                  </div>

                  <div class="form-group">
                      <label for="email">Email</label>
                      <input @blur="$v.form.email.touch()" v-model="form.email" id="email" type="email" class="form-input">
                      <template v-if="$v.form.email.$invalid && form.email!=null"> 
                          <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
                          <span v-if="!$v.form.email.required" class="form-error">Email has to be valid</span>
                      </template>
                  </div>

                  <div class="form-group">
                      <label for="password">Password</label>
                      <input @blur="$v.form.password.touch()" v-model="form.password" id="password" type="password" class="form-input">
                      <template v-if="$v.form.password.$invalid && form.password!=null"> 
                          <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
                          <span v-if="!$v.form.password.minLength" class="form-error">Password must be at lest 8 characters long</span>
                      </template>
                  </div>

                  <div class="form-group">
                      <label for="avatar">Avatar</label>
                      <input id="avatar" @blur="$v.form.avatar.touch()" v-model="form.avatar" type="text" class="form-input">
                      <template v-if="$v.form.avatar.$invalid && form.avatar!=''">
                          <span v-if="!$v.form.avatar.url" class="form-error">Add valid URL</span>
                          <span v-if="!$v.form.avatar.supportedImg && $v.form.avatar.url" class="form-error">Choose .jpg .jpeg .svg .gif or .png file</span>
                      </template>
                  </div>

                  <div class="form-actions">
                      <button  type="submit" class="btn-blue btn-block">Register</button>
                  </div>
              </form>
          </div>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import {required,email,minLength,url} from 'vuelidate/lib/validators'
export default {
    data(){
        return{
            form:{
                name:null,
                username:null,
                password:null,
                email:null,
                avatar:''
            }
        }
    },
    methods:{
        register(){
         this.$store.dispatch('registerUserWithEmailAndPassword',this.form)
         .then(()=>{
             this.$router.push("/")
         })
        }
    },
    validations:{
        form:{
            name:{
                required
            },
            username:{
                required
            },
            email:{
                required,
                email
            },
            password:{
                required,
                minLength:minLength(8)
            },
            avatar:{
                url,
                supportedImg(value){
                    const supported=['jpg','jpeg','svg','gif','png']
                    const suffix = value.split('.').pop()
                    return supported.includes(suffix)
                }
            }
        }
    },
    created(){
        this.$emit('ready')
    }
}
</script>

<style scoped>

</style>