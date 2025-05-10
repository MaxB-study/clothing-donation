import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView,
  },
  // Weitere Routen hier hinzufügen
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
