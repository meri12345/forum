// The Vue build version to load with the `import` command

import Vue from 'vue'
import App from './App'
import router from './router'
import AppDate from './components/AppDate'
import store from './store/index'
import firebase from 'firebase'
import vuelidate from 'vuelidate'

Vue.component('AppDate',AppDate)
Vue.use(vuelidate)
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyB0GsAh9s-QWJ3tKGQLh4hO1am2Z_DYnu4",
  authDomain: "forum-9fa6c.firebaseapp.com",
  databaseURL: "https://forum-9fa6c.firebaseio.com",
  projectId: "forum-9fa6c",
  storageBucket: "forum-9fa6c.appspot.com",
  messagingSenderId: "840016620472",
  appId: "1:840016620472:web:50feeb709bebb68b9fbd4d",
  measurementId: "G-ZQ2TT2JY2N"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})
