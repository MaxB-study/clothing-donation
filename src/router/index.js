import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../components/WelcomeView.vue';
import FormularView from '../components/FormularView.vue';
import SuccessView from '../components/SuccessView.vue';
import ImpressumView from '../components/ImpressumView.vue';
import DataProtectionView from '../components/DataProtectionView.vue';
import CompanyDescriptionView from '../components/CompanyDescriptionView.vue';

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
    {
    path: '/impressum',
    name: 'Impressum',
    component: ImpressumView,
  },
    {
    path: '/datenschutz',
    name: 'Datenschutz',
    component: DataProtectionView,
  },
   {
    path: '/ueber-uns',
    name: 'UeberUns',
    component: CompanyDescriptionView,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
