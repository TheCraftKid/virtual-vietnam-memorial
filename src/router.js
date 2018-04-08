import Vue from 'vue';
import Router from 'vue-router';
import PresentationHome from './views/PresentationHome.vue';
import PresentationView from './views/PresentationView.vue';
import UploadScreen from './views/UploadScreen.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: PresentationHome,
    },
    {
      path: '/period/:classPeriod',
      name: 'home-period',
      props: true,
      component: PresentationHome,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadScreen,
    },
    {
      path: '/present/:id',
      name: 'present',
      props: true,
      component: PresentationView,
    },
    {
      path: '/present',
      alias: 'present',
    },
  ],
});
