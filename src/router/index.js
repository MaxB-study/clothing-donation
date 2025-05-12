import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../components/WelcomeView.vue';
import FormularView from '../components/FormularView.vue';
import SuccessView from '../components/SuccessView.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView,
  },
  {
    path: '/spenden',
    name: 'Spenden',
    component: FormularView,
  },
  {
    path: '/success',
    name: 'Success',
    component: SuccessView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
