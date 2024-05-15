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
import { getRole } from '@/services/usersService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // HomeView
    { path: '/',            
      component: HomeView,   
      meta: { hideMenu: true },
      async beforeEnter() { await beforeHome(); }
    },
    { path: '/logowanie',   
      component: SignInView, 
      meta: { hideMenu: true },
      async beforeEnter() { await beforeHome(); }
    },
    { path: '/rejestracja', 
      component: SignUpView, 
      meta: { hideMenu: true },
      async beforeEnter() { await beforeHome(); }
    },

    // UserView
    { path: '/graj',    component: NonogramView, meta: { pageOwner: 'user' } },
    { path: '/wyzwanie',component: DailyView,    meta: { pageOwner: 'user' } },
    { path: '/kreator', component: CreateView,   meta: { pageOwner: 'user' } },
    { path: '/ranking', component: RatingView,   meta: { pageOwner: 'user' } },
    { path: '/profil',  component: ProfileView,  meta: { pageOwner: 'user' } },

    // AdminView
    { path: '/uzytkownicy',  component: UsersView,  meta: { pageOwner: 'admin' } }
  ]
});

async function beforeHome() {
  await getRole()
  .then(res => { 
    if (res.data.role === 'user') {
      router.push('/graj');
    } else if (res.data.role === 'admin') {
      router.push('/uzytkownicy');
    }
  })
  .catch(err => {
    
  });
}


export default router
