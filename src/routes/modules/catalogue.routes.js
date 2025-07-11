import ShirtsCataloguePage from "@/components/catalogue/shirts-catalogue/shirts-catalogue.page.vue";
import ShirtDescriptionPage from "@/components/catalogue/catalogue-shirts-description/shirt-description.page.vue";

export const catalogueRoutes = [
  { path: '/catalogue', component: ShirtsCataloguePage},
  { path: '/catalogue/:id', name: "shirtDescription", component: ShirtDescriptionPage}
]