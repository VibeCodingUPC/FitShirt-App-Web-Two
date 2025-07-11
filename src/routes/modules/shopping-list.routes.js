import UserShoppingList from "@/components/client-layout/shopping-list/user-shopping-list/user-shopping-list.page.vue"

export const shoppingList = [
  { path: '/shopping-list', component: UserShoppingList, meta: { requiresAuth: true, userRole: 'CLIENT' }}
]
