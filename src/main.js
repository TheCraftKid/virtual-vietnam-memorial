import Vue from 'vue';
import VueMaterial from 'vue-material';
import * as firebase from 'firebase';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyAJQsK-E1x0V_NUdqGMczyA50FjfiveBIc',
  authDomain: 'virtual-vietnam-memorial.firebaseapp.com',
  databaseURL: 'https://virtual-vietnam-memorial.firebaseio.com',
  projectId: 'virtual-vietnam-memorial',
  storageBucket: 'virtual-vietnam-memorial.appspot.com',
  messagingSenderId: '630952775823',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
