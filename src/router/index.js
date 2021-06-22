// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import First from '../components/First.vue'
import Second from '../components/Second.vue'
import Third from '../components/Third.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' }, // 重定位
    {
      path: '/home',
      component: Home,
      redirect: '/Welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/first', component: First },
        { path: '/second', component: Second },
        { path: '/third', component: Third }
      ]
    }
  ]
})

export default router
