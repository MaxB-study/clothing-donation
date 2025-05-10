import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../components/WelcomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
