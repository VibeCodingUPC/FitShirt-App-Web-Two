import UserRegisterComponent from '@/components/authentication/register/user-register.page.vue';
import UserLoginComponent from '@/components/authentication/login/user-login.page.vue';

export const authenticationRoutes = [
  { path: '/register', component: UserRegisterComponent},
  { path: '/login', component: UserLoginComponent}
];