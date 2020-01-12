import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import './registerServiceWorker';

Vue.config.productionTip = false;

let app;

const config = {
  apiKey: 'AIzaSyDwpTemPlyJ-nyp2fWmfb7nB_BS49wUDkw',
  authDomain: 'strellus-68be0.firebaseapp.com',
  databaseURL: 'https://strellus-68be0.firebaseio.com',
  projectId: 'strellus-68be0',
  storageBucket: 'strellus-68be0.appspot.com'
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});


