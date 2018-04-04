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
  apiKey: 'AIzaSyC3KJEOaHk4qoRYBMrPt6wtUv4uq6ttV50',
  authDomain: 'willie-personal-projects.firebaseapp.com',
  databaseURL: 'https://willie-personal-projects.firebaseio.com',
  projectId: 'willie-personal-projects',
  storageBucket: 'virtual-vietnam-memorial',
  messagingSenderId: '1050896936846',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
