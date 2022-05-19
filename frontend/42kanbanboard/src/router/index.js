import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AppMain from '@/components/AppMain'
import Login from '@/components/Login'

// import Project from '@/components/Project'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      redirect: '/index'
    },
    {
      path: '/index',
      name: '42 Kanban',
      component: HelloWorld
    },
    {
      path: '/project/:projectName',
      name: 'Your Project',
      component: AppMain,
      props: true
      // children: [
      //   {
      //     path: '/:projectName',
      //     name: 'Project',
      //     props: true
      //   }
      // ]
    },
    {
      path: '/login',
      name: 'Log in',
      components: [AppMain, Login]
    }
  ]
})
