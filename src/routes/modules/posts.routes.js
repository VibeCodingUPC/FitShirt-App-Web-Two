import EditShirtPage from "@/components/posts/edit-post/edit-shirt.page.vue";
import PublishShirtPage from "@/components/posts/publish-post/publish-shirt.page.vue";
import PostCataloguePage from "@/components/posts/shirt-posts/post-catalogue.page.vue";
export const postsRoutes = [
    { path: '/published', component: PostCataloguePage},
    { path: '/publish', component: PublishShirtPage},
    { path: '/edit-shirt/:id', name: "shirtEdit",component: EditShirtPage}
]