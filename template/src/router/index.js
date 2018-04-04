import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Info = () => import(/* webpackChunkName: "info" */ '@components/info/');
const App = () => import(/* webpackChunkName: "app1" */ '../general/app/index');

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: App },
        { path: '/info', component: Info }
    ]
});


export default router;
