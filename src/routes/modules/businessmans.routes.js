import BusinessmanSectionPage from "@/components/client-layout/businessmans/pages/businessman-section.page.vue";
import BusinessmanInfoPage from "@/components/client-layout/businessmans/pages/businessman-info.page.vue";


export const businessmansRoutes = [
    {path:'/businessman-list', component: BusinessmanSectionPage, meta: { requiresAuth: true, userRole: 'CLIENT' }},
    {path:'/businessman/:id', component: BusinessmanInfoPage, meta:{requiresAuth: true, userRole: 'CLIENT'}},
]