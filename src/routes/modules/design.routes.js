import CreateDesignPage from "@/components/design/create-design/create-design.page.vue";
import EditDesignPage from "@/components/design/edit-design/edit-design.page.vue";
import DesignCataloguePage from "@/components/design/shirt-design/design-catalogue.page.vue";
export const designRoutes = [
    {path: '/my-design', component: DesignCataloguePage},
    {path: '/create-design', component: CreateDesignPage},
    {path: '/edit-design/:id', name: "editDesign", component: EditDesignPage}
]