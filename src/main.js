import Vue from 'vue';
import App from '@/App.vue';
import router from '@router';
import store from '@store';
import 'lib-flexible';

Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.productionTip = process.env.NODE_ENV === 'production';

// Vue实例挂载到window
window.myVue = new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
