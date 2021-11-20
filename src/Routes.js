import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';

// Pages
import HomePageSettings from '@/pages/HomePageSettings/HomePageSettings';
import Typography from '@/pages/Typography/Typography'
import Products from '@/pages/Products/Basic'
import Notifications from '@/pages/Notifications/Notifications'
import Icons from '@/pages/Icons/Icons'
import Charts from '@/pages/Charts/Charts'
import Maps from '@/pages/Maps/Google'
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";

Vue.use(Router);

let router = new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
    path: '/',
    redirect: 'login',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'homePageSettings',
        name: 'HomePageSettings',
        component: HomePageSettings,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Typography,
        meta: { requiresAuth: true }
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications,
        meta: { requiresAuth: true }
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons,
        meta: { requiresAuth: true }
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts,
        meta: { requiresAuth: true }
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps,
        meta: { requiresAuth: true }
      },
    ],
  },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ],
});

router.beforeEach((to, from,next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log(requiresAuth);
  next();
  // if (!requiresAuth) next('login')
  // else if (requiresAuth) next('dashboard')
  // else next();
})

export default router;