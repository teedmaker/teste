import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Welcome from '../views/Welcome.vue'
import AdminApp from '../views/Admin/AdminApp.vue'
import Home from '../views/Admin/Home.vue'
import Saque from '../views/Admin/Saque.vue'
import api from '../helpers/api';
import store from '../store/index';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminApp,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/admin/home',
          name: 'adminHome',
          component: Home
        },
        {
          path: '/admin/saque',
          name: 'saque',
          component: Saque
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'login' })
      return;
    }

    // get user info
    api.post('', {
      action: 'cliente.dados',
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(({ data }) => {
      store.state.profile.user = data.user;
      next()

    }).catch((error) => {
      console.log('error', error);
      next({ name: 'login' })
    });
    return;
  }
  next() // does not require auth, make sure to always call next()!
})

export default router
