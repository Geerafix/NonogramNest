import { createRouter, createWebHistory } from 'vue-router'
import { getRole } from '@/services/userService'
const userRole = 'user';
const adminRole = 'admin';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // HomeView
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/HomeView.vue'),
      meta: { hideMenu: true },
    },
    {
      path: '/logowanie',
      name: 'SignIn',
      component: () => import('@/views/home/SignInView.vue'),
      meta: { hideMenu: true },
    },
    {
      path: '/rejestracja',
      name: 'SignUp',
      component: () => import('@/views/home/SignUpView.vue'),
      meta: { hideMenu: true },
    },

    // UserView
    {
      path: '/graj',
      name: 'Play',
      component: () => import('@/views/user/NonogramView.vue'),
      meta: { pageOwner: userRole },
    },
    {
      path: '/wyzwanie',
      name: 'Challenge',
      component: () => import('@/views/user/DailyView.vue'),
      meta: { pageOwner: userRole },
    },
    {
      path: '/kreator',
      name: 'Creator',
      component: () => import('@/views/user/CreateView.vue'),
      meta: { pageOwner: userRole },
    },
    {
      path: '/ranking',
      name: 'Rating',
      component: () => import('@/views/user/RatingView.vue'),
      meta: { pageOwner: userRole },
    },
    {
      path: '/osiagniecia',
      name: 'Achievements',
      component: () => import('@/views/user/AchievementsView.vue'),
      meta: { pageOwner: userRole },
    },
    {
      path: '/profil',
      name: 'Profile',
      component: () => import('@/views/user/ProfileView.vue'),
      meta: { pageOwner: userRole },
    },
    {
      path: '/ustawienia',
      name: 'UserSettings',
      component: () => import('@/views/user/UserSettingsView.vue'),
      meta: { pageOwner: userRole },
    },

    // AdminView
    {
      path: '/uzytkownicy',
      name: 'ManageUsers',
      component: () => import('@/views/admin/ManageUsersView.vue'),
      meta: { pageOwner: adminRole },
    },
    {
      path: '/gry',
      name: 'ManagePuzzles',
      component: () => import('@/views/admin/ManagePuzzlesView.vue'),
      meta: { pageOwner: adminRole },
    },
    {
      path: '/osiagniecia',
      name: 'ManageAchievements',
      component: () => import('@/views/admin/ManageAchievementsView.vue'),
      meta: { pageOwner: adminRole },
    },
    {
      path: '/wiadomosci',
      name: 'AdminMessages',
      component: () => import('@/views/admin/AdminMessagesView.vue'),
      meta: { pageOwner: adminRole },
    },
    {
      path: '/ustawienia',
      name: 'AdminSettings',
      component: () => import('@/views/admin/AdminSettingsView.vue'),
      meta: { pageOwner: adminRole },
    }
  ]
});

router.beforeEach(async (to, from) => {
  const role = await getRole();
  if (to.meta.hideMenu === true) {
    if (role === userRole) { 
      return { name: 'Play' }; 
    } else if (role === adminRole) { 
      return { name: 'ManageUsers' }; 
    }
  } else if (!to.meta.hideMenu) {
    if (typeof role !== 'undefined') {
      if (role !== to.meta.pageOwner) { 
        return { name: from.name } 
      }
    } else if (typeof role === 'undefined') {
      return { name: 'SignIn' };
    }
  }
});

export default router
