<template>
    <header class="header" id="header">

        <router-link tag="a" :to="{name:'Home'}" class="logo">
            <img src="../assets/img/svg/vueschool-logo.svg" >
        </router-link>

        <div class="btn-hamburger">
            <!-- use .btn-humburger-active to open the menu -->
            <div class="top bar"></div>
            <div class="middle bar"></div>
            <div class="bottom bar"></div>
        </div>

    <!-- use .navbar-open to open nav -->
    <nav  class="navbar">
        <ul v-if="user">

            <li class="navbar-user">
                 <a @click="userDropdownOpen=!userDropdownOpen">
                    <img class="avatar-small" :src="user.avatar" alt="">
                    <span >
                        {{user.username}}
                        <img  class="icon-profile" src="../assets/img/svg/arrow-profile.svg" alt="">
                    </span>
                </a>
                <!-- dropdown menu -->
                <!-- add class "active-drop" to show the dropdown -->
                <div id="user-dropdown" :class="{'active-drop':userDropdownOpen}">
                    <div class="triangle-drop"></div>
                    <ul class="dropdown-menu">
                        <li class="dropdown-menu-item"> <router-link tag="a" :to="{name:'Profile'}" href="#">View profile</router-link></li>
                        <li class="dropdown-menu-item" @click.prevent="$store.dispatch('signOut')"><a>Sign Out</a></li>

                    </ul>
                </div>
            </li>
        </ul>

        <ul v-else>
            <li class="navbar-user"><router-link tag="a" :to="{name:'signIn'}">Sign In</router-link></li>
        </ul>
    </nav>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters({
            'user':'authUser'
        })
    },
    data(){
        return{
            userDropdownOpen:false
        }
    }
}
</script>