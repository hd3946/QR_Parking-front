import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/makeqr',
      component: () => import('@/views/MakeQRPage.vue'),
    },
    //상대방 프로필
    {
      path: '/:id/profile',
      component: () => import('@/views/ProfilePage.vue'),
    },
    {
      path: '/:id/signup',
      component: () => import('@/views/RegisterQRPage.vue'),
    },
    //나의 프로필
    {
      path: '/myProfile',
      component: () => import('@/views/MyProfilePage.vue'),
    },
    // {
    //   path: '/post/:id',
    //   component: () => import('@/views/PostEditPage.vue'),
    // },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});
