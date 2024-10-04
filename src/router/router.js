import { createRouter, createWebHistory } from 'vue-router'
import { getUserRole } from '@/services/userService'
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
      meta: { 
        hideMenu: true, 
        title: 'Nonogramy.pl' 
      },
    },
    {
      path: '/logowanie',
      name: 'SignIn',
      component: () => import('@/views/home/SignInView.vue'),
      meta: { 
        hideMenu: true,
        title: 'Logowanie'
      },
    },
    {
      path: '/rejestracja',
      name: 'SignUp',
      component: () => import('@/views/home/SignUpView.vue'),
      meta: { 
        hideMenu: true,
        title: 'Rejestracja'
      },
    },

    // UserView
    {
      path: '/graj',
      name: 'Play',
      component: () => import('@/views/user/PlayView.vue'),
      meta: { 
        pageOwner: userRole,
        title: 'Graj'
      },
    },
    {
      path: '/wyzwanie',
      name: 'Challenge',
      component: () => import('@/views/user/DailyView.vue'),
      meta: { 
        pageOwner: userRole,
        title: 'Codzienne wyzwanie' 
      },
    },
    {
      path: '/kreator',
      name: 'Creator',
      component: () => import('@/views/user/CreateView.vue'),
      meta: { 
        pageOwner: userRole,
        title: 'Kreator nonogramów' 
      },
    },
    {
      path: '/spolecznosc',
      name: 'Community',
      component: () => import('@/views/user/CommunityView.vue'),
      meta: { 
        pageOwner: userRole,
        title: 'Gry społeczności' 
      },
    },
    {
      path: '/spolecznosc/:id',
      name: 'CommunityGame',
      component: () => import('@/views/user/CommunityGameView.vue'),
      meta: {
        pageOwner: userRole,
        title: 'Gra społeczności'
      },
    },
    {
      path: '/ranking',
      name: 'Rating',
      component: () => import('@/views/user/RatingView.vue'),
      meta: { 
        pageOwner: userRole,
        title: 'Ranking' 
      },
    },
    {
      path: '/osiagniecia',
      name: 'Achievements',
      component: () => import('@/views/user/AchievementsView.vue'),
      meta: { 
        pageOwner: userRole,
        title: 'Osiągnięcia'
      },
    },
    {
      path: '/profil',
      name: 'Profile',
      component: () => import('@/views/user/ProfileView.vue'),
      meta: { 
        pageOwner: userRole,
        title: 'Profil' 
      },
    },
    {
      path: '/ustawienia',
      name: 'UserSettings',
      component: () => import('@/views/user/UserSettingsView.vue'),
      meta: { 
        pageOwner: userRole,
        title: 'Ustawienia' 
      },
    },

    // AdminView
    {
      path: '/uzytkownicy',
      name: 'ManageUsers',
      component: () => import('@/views/admin/ManageUsersView.vue'),
      meta: { 
        pageOwner: adminRole,
        title: 'Użytkownicy' 
      },
    },
    {
      path: '/gry',
      name: 'ManagePuzzles',
      component: () => import('@/views/admin/ManagePuzzlesView.vue'),
      meta: { 
        pageOwner: adminRole,
        title: 'Gry' 
      },
    },
    {
      path: '/osiagniecia',
      name: 'ManageAchievements',
      component: () => import('@/views/admin/ManageAchievementsView.vue'),
      meta: { 
        pageOwner: adminRole,
        title: 'Osiągnięcia' 
      },
    },
    {
      path: '/wiadomosci',
      name: 'AdminMessages',
      component: () => import('@/views/admin/AdminMessagesView.vue'),
      meta: { 
        pageOwner: adminRole,
        title: 'Wiadomości'
      },
    },
    {
      path: '/ustawienia',
      name: 'AdminSettings',
      component: () => import('@/views/admin/AdminSettingsView.vue'),
      meta: { 
        pageOwner: adminRole,
        title: 'Ustawienia' 
      },
    }
  ]
});

router.beforeEach(async (to, from) => {
  const role = await getUserRole();
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

  document.title = to.meta.title;
});

export default router
