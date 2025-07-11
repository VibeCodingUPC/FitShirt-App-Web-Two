import ClientListPage from "@/components/seller-layout/clients/clients-list/clients-list.page.vue";
import ClientDescriptionPage from "@/components/seller-layout/clients/client-description/client-description.page.vue";

export const clientsListRoutes = [
    { path: '/clientslist', component: ClientListPage, meta: { requiresAuth: true, role: 'SELLER' } },
    { path: '/clients/:id',component: ClientDescriptionPage, meta: { requiresAuth: true, role: 'SELLER' }}
]