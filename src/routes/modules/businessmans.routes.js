import BusinessmanSectionPage from "@/components/client-layout/businessmans/pages/businessman-section.page.vue";

export const businessmansRoutes = [
    {path:'/businessman-list', component: BusinessmanSectionPage, meta: { requiresAuth: true, userRole: 'CLIENT' }}
]