import BusinessmanSectionPage from "@/components/businessmans/pages/businessman-section.page.vue";

export const businessmansRoutes = [
    {path:'/businessman-list', component: BusinessmanSectionPage, meta: { requiresAuth: true, userRole: 'CLIENT' }}
]