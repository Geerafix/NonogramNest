import { createRouter, createWebHistory } from 'vue-router'
import NonogramView from '../views/NonogramView.vue'
import ProfileView from '../views/ProfileView.vue'
import RatingView from '@/views/RatingView.vue'
import DailyView from '@/views/DailyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NonogramView
    },
    {
      path: '/wyzwanie',
      name: 'wyzwanie',
      component: DailyView
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RatingView
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfileView
    }
  ]
})

export default router
