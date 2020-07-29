import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/pages/PageHome'
import PageThreadShow from '@/pages/PageThreadShow'
import PageThreadEdit from '@/pages/PageThreadEdit'
import PageThreadCreate from '@/pages/PageThreadCreate'
import PageNotFound from '@/pages/PageNotFound'
import PageForum from '@/pages/PageForum'
import PageCategory from '@/pages/PageCategory'
import PageProfile from '@/pages/PageProfile'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: PageHome,
      name: 'Home'
    },
    {
      path: '/forum/:id',
      component: PageForum,
      name: 'Forum',
      props: true
    },
    {
      path: '/me',
      component: PageProfile,
      name: 'Profile',
      props: true
    },
    {
      path: '/me/edit',
      component: PageProfile,
      name: 'ProfileEdit',
      props: {
        edit:true
      }
    },
    {
      path: '/category/:id',
      component: PageCategory,
      name: 'Category',
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: PageThreadShow,
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: PageThreadEdit,
      props: true
    },
    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: PageThreadCreate,
      props: true
    },
    {
      path:'*',
      name:'NotFound',
      component: PageNotFound
    }
  ],
  mode:'history'
})
