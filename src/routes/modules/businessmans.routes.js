import BusinessmanSectionPage from "@/components/businessmans/pages/businessman-section.page.vue";
import BusinessmanInfoPage from "@/components/businessmans/pages/businessman-info.page.vue"


export const businessmansRoutes = [
    {path:'/businessman-list', component: BusinessmanSectionPage, meta:{title: 'List-Mans'}},
    {path:'/businessman/:id', component: BusinessmanInfoPage, meta:{title: 'BusinessMans'}},
]