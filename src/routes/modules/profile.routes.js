import EditUserDataPage from "@/components/shared/profile/edit-user-profile/edit-user-data/edit-user-data.page.vue";
import EditUserPasswordPage from "@/components/shared/profile/edit-user-profile/edit-user-password/edit-user-password.page.vue";
import EditUserPaymentMethodPage from "@/components/shared/profile/edit-user-profile/edit-user-payment/edit-user-payment-method.page.vue";
import UserProfilePage from "@/components/shared/profile/user-profile/user-profile.page.vue";
//import EditShirtPage from "@/components/posts/edit-post/edit-shirt.page.vue";

export const profileRoutes = [
  { path: '/profile', component: UserProfilePage },
  { path: '/profile/:id', name: "profileId",component: UserProfilePage},
  { path: '/edit-profile', component: EditUserDataPage },
  { path: '/edit-password', component: EditUserPasswordPage },
  { path: '/edit-payment-method', component: EditUserPaymentMethodPage }
]