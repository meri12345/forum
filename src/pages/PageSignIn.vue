<template>
    <div class="flex-grid justify-center">
        <div class="col-2">

            <form @submit.prevent="signIn" action="" class="card card-form">
                <h1 class="text-center">Login</h1>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" v-model="form.email" type="text" class="form-input">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" v-model="form.password" type="password" class="form-input">
                </div>

                <div class="push-top">
                    <button type="submit" class="btn-blue btn-block">Log in</button>
                </div>

                <div class="form-actions text-right">
                    <router-link tag="a" :to="{name:'Register'}" >Create an account?</router-link>
                </div>
            </form>

            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                email:null,
                password:null
            }
        }
    },
    methods:{
        signIn(){
            this.$store.dispatch('signInWithEmailAndPassword',{
                email:this.form.email,
                password:this.form.password
            })
            .then(()=>this.$router.push("/"))
            .catch(err => alert(err.message))
        }
    },
    created(){
        this.$emit('ready')
    }
}
</script>