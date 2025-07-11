<script setup>
import { onBeforeMount, ref } from 'vue';
import filters from './shirt-filters.component.vue';
import shirtCard from '../../shared/shirt-components/shirt-card.component.vue';
import { PostsApiService } from "@/services/posts-api.service.js";
import { AccountApiService } from '@/services/account-api.service';

let posts = ref([]);
const postservice = new PostsApiService();
const authApiService = new AccountApiService();

const fetchPostsData = async () => {
  posts.value = await postservice.getPostByUserId(authApiService.getUserIdFromToken());
}

onBeforeMount(async () => {
  fetchPostsData();
});
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
          class="custom-card"
          name-router="shirtEdit"
          :ariaLabelRouter="`Edit post ${post.name}`"
      />
    </div>
    <div v-else>
      <p class="loading-text">Loading...</p>
    </div>
    <filters/>
  </div>
</template>

<style>
.catalogue-container {
  flex: .95;
  background-color: #e0e7ff;
  padding: 20px;
  border-radius: 8px;
}

.catalogue-container .shirts-container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: auto;
  flex-wrap: wrap;
}

.shirt-card {
  width: 180px;
  min-height: 240px;
  background-color: #e0e7ff;
  border-radius: 6px;
  padding: 1.1em .6em 0 .6em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.shirt-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}

.shirt-card .shirt-card-title {
  font-size: 1em;
  color: #3B82F6;
  font-weight: bold;
}

.shirt-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>

