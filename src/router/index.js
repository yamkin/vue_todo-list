import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/HomeView.vue';
import TaskList from '../components/TaskList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
