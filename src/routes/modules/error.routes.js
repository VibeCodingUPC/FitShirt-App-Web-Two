import NotFoundPage from "@/components/errors/not-found/not-found.page.vue";
export const errorRoutes = [
    {path:'/:pathMatch(.*)*',component:NotFoundPage}
];