import {createRouter, createWebHistory} from 'vue-router'
import {getUserRole} from '@/services/userService'

const userRole = 'user';
const adminRole = 'admin';

const view = (owner, name) => (() => import(`@/views/${owner}/${name}View.vue`));

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Home View
        {
            path: '/',
            name: 'Home',
            component: view('home', 'Home'),
            meta: {
                hideMenu: true,
                title: 'NonogramNest'
            },
        },
        {
            path: '/logowanie',
            name: 'SignIn',
            component: view('home', 'SignIn'),
            meta: {
                hideMenu: true,
                title: 'Logowanie'
            },
        },
        {
            path: '/rejestracja',
            name: 'SignUp',
            component: view('home', 'SignUp'),
            meta: {
                hideMenu: true,
                title: 'Rejestracja'
            },
        },

        // User View
        {
            path: '/graj',
            name: 'Play',
            component: view('user', 'Play'),
            meta: {
                pageOwner: userRole,
                title: 'Graj'
            },
        },
        {
            path: '/wyzwanie',
            name: 'Challenge',
            component: view('user', 'Daily'),
            meta: {
                pageOwner: userRole,
                title: 'Codzienne wyzwanie'
            },
        },
        {
            path: '/kreator',
            name: 'Creator',
            component: view('user', 'Create'),
            meta: {
                pageOwner: userRole,
                title: 'Kreator nonogramów'
            },
        },
        {
            path: '/spolecznosc',
            name: 'Community',
            component: view('user', 'Community'),
            meta: {
                pageOwner: userRole,
                title: 'Gry społeczności'
            },
        },
        {
            path: '/spolecznosc/:id',
            name: 'CommunityGame',
            component: view('user', 'CommunityGame'),
            meta: {
                pageOwner: userRole,
                title: 'Gra społeczności'
            },
        },
        {
            path: '/ranking',
            name: 'Rating',
            component: view('user', 'Rating'),
            meta: {
                pageOwner: userRole,
                title: 'Ranking'
            },
        },
        {
            path: '/osiagniecia',
            name: 'Achievements',
            component: view('user', 'Achievements'),
            meta: {
                pageOwner: userRole,
                title: 'Osiągnięcia'
            },
        },
        {
            path: '/profil',
            name: 'Profile',
            component: view('user', 'Profile'),
            meta: {
                pageOwner: userRole,
                title: 'Profil'
            },
        },

        // Admin View
        {
            path: '/uzytkownicy',
            name: 'ManageUsers',
            component: view('admin', 'ManageUsers'),
            meta: {
                pageOwner: adminRole,
                title: 'Użytkownicy'
            },
        },
        {
            path: '/gry',
            name: 'ManagePuzzles',
            component: view('admin', 'ManagePuzzles'),
            meta: {
                pageOwner: adminRole,
                title: 'Oczekujące gry'
            },
        },
        {
            path: '/osiagniecia',
            name: 'ManageAchievements',
            component: view('admin', 'ManageAchievements'),
            meta: {
                pageOwner: adminRole,
                title: 'Osiągnięcia'
            },
        },
        {
            path: '/wiadomosci',
            name: 'AdminMessages',
            component: view('admin', 'ManageMessages'),
            meta: {
                pageOwner: adminRole,
                title: 'Wiadomości'
            },
        }
    ]
});

router.beforeEach(async (to, from) => {
    const role = await getUserRole();
    if (to.meta.hideMenu === true) {
        if (role === userRole) {
            return {name: 'Play'};
        } else if (role === adminRole) {
            return {name: 'ManageUsers'};
        }
    } else if (!to.meta.hideMenu) {
        if (typeof role !== 'undefined') {
            if (role !== to.meta.pageOwner) {
                return {name: from.name}
            }
        } else if (typeof role === 'undefined') {
            return {name: 'SignIn'};
        }
    }

    document.title = to.meta.title;
});

export default router;
