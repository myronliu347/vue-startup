import 'normalize.css';
import 'babel-polyfill';

import Vue from 'vue';
import router from './router';
import App from './App';
{{#if_eq state 'vuex'}}
import { sync } from 'vuex-router-sync';
{{/if_eq}}

const env = process.env.NODE_ENV || 'development';

if (env !== 'development') {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
}

{{#if_eq state 'vuex'}}
import store from './store/index';
{{/if_eq}}

// dynamic import for on-demand loaded chunk


{{#if_eq state 'vuex'}}
sync(store, router);
{{/if_eq}}

const app = new Vue({
    router,
    {{#if_eq state 'vuex'}}
    store,
    {{/if_eq}}
    ...App
});

app.$mount('#app');
