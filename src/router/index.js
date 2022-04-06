import Vue from 'vue'
import Router from 'vue-router'
import ListMovie from '@/components/ListMovie'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/listmovie/',
      name: 'ListMovie',
      component: ListMovie
    }
  ]
})
