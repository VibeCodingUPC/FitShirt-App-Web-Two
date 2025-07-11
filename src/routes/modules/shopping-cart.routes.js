import UserShoppingCartPage from "@/components/client-layout/cart/user-shopping-cart/user-shopping-cart.page.vue"

export const shoppingCart = [
  { path: '/cart', component: UserShoppingCartPage, meta: { requiresAuth: true, userRole: 'CLIENT' }}
]