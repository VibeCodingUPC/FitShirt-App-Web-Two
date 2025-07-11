<script setup>
import { onBeforeMount, ref } from 'vue';
import filters from './shirt-filters.component.vue';
import shirtCard from '../../shared/shirt-components/shirt-card.component.vue';
import { PostsApiService } from "@/services/posts-api.service.js";
import { AccountApiService } from '@/services/account-api.service';

let posts=ref([]);
const postservice = new PostsApiService();
const authApiService = new AccountApiService();

const fetchPostsData = async () => {
  posts.value = await postservice.getPostByUserId(authApiService.getUserIdFromToken());
}

onBeforeMount(async () => {
  fetchPostsData();
})
</script>

<template>
  <div
      class="catalogue-container"
      aria-describedby="Catalog of publications made by the user"
  >
    <div class="shirts-container" v-if="posts">
      <shirt-card
          v-for="post in posts"
          :key="post.id"
          :id="post.id"
          :image-src="post.image"
          :name="post.name"
          name-router="shirtEdit"
          :ariaLabelRouter="`Edit post ${post.name}`"
      />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <filters/>
  </div>
</template>

<style scoped>
.catalogue-container {
  flex: .95;
}
.catalogue-container .shirts-container {
  display: flex;
  justify-content: space-around;
  gap: 8px;
  margin: auto;
  flex-wrap: wrap;
}
</style>
