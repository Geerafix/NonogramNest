import { createRouter, createWebHistory } from 'vue-router'
import NonogramView from '@/views/user/NonogramView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import RatingView from '@/views/user/RatingView.vue'
import DailyView from '@/views/user/DailyView.vue'
import CreateView from '@/views/user/CreateView.vue'

import HomeView from '@/views/home/HomeView.vue'
import SignInView from '@/views/home/SignInView.vue'
import SignUpView from '@/views/home/SignUpView.vue'
import UsersView from '@/views/admin/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // HomeView
    { path: '/',            component: HomeView,   meta: { hideMenu: true }},
    { path: '/logowanie',   component: SignInView, meta: { hideMenu: true } },
    { path: '/rejestracja', component: SignUpView, meta: { hideMenu: true } },

    // UserView
    { path: '/graj',    component: NonogramView, meta: { pageOwner: 'user' } },
    { path: '/wyzwanie',component: DailyView,    meta: { pageOwner: 'user' } },
    { path: '/kreator', component: CreateView,   meta: { pageOwner: 'user' } },
    { path: '/ranking', component: RatingView,   meta: { pageOwner: 'user' } },
    { path: '/profil',  component: ProfileView,  meta: { pageOwner: 'user' } },

    // AdminView
    { path: '/uzytkownicy',  component: UsersView,  meta: { pageOwner: 'admin' } }
  ]
})

export default router
