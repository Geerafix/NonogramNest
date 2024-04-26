import { createRouter, createWebHistory } from 'vue-router'
import NonogramView from '../views/NonogramView.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NonogramView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    }
  ]
})

export default router
