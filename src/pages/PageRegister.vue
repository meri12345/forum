<template>
    <div class="container">

      <div class="flex-grid justify-center">
          <div class="col-2">

              <form @submit.prevent="register" action="" class="card card-form">
                  <h1 class="text-center">Register</h1>

                  <div class="form-group">
                      <label for="name">Full Name</label>
                      <input v-model="form.name" id="name" type="text" class="form-input">
                  </div>

                  <div class="form-group">
                      <label for="username">Username</label>
                      <input v-model="form.username" id="username" type="text" class="form-input">
                  </div>

                  <div class="form-group">
                      <label for="email">Email</label>
                      <input v-model="form.email" id="email" type="email" class="form-input">
                  </div>

                  <div class="form-group">
                      <label for="password">Password</label>
                      <input v-model="form.password" id="password" type="password" class="form-input">
                  </div>

                  <div class="form-group">
                      <label for="avatar">Avatar</label>
                      <input id="avatar" v-model="form.avatar" type="text" class="form-input">
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
export default {
    data(){
        return{
            form:{
                name:null,
                username:null,
                password:null,
                email:null,
                avatar:null
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
    created(){
        this.$emit('ready')
    }
}
</script>

<style scoped>

</style>