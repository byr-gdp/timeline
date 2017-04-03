import Vue from 'vue';
import Router from 'vue-router';
// import Foo from '@/components/Foo';
// import Bar from '@/components/Bar';
import Login from '@/components/Login';
import Index from '@/components/Index';
import Logout from '@/components/Logout';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
