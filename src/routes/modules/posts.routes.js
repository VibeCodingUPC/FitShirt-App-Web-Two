import EditShirtPage from "@/components/seller-layout/posts/edit-post/edit-shirt.page.vue";
import PublishShirtPage from "@/components/seller-layout/posts/publish-post/publish-shirt.page.vue";
import PostCataloguePage from "@/components/seller-layout/posts/shirt-posts/post-catalogue.page.vue";
export const postsRoutes = [
    { path: '/published', component: PostCataloguePage, meta: { requiresAuth: true, role: 'SELLER' } },
    { path: '/publish', component: PublishShirtPage, meta: { requiresAuth: true, role: 'SELLER' }},
    { path: '/edit-shirt/:id', name: "shirtEdit",component: EditShirtPage, meta: { requiresAuth: true, role: 'SELLER' }}
]