<script setup>
import { onMounted, ref } from 'vue';
import filters from './shirt-filters.component.vue';
import shirtCard from '../../shared/shirt-components/shirt-card.component.vue';
import { PostsApiService } from '@/services/posts-api.service';

let shirts=ref([]);
const postsService = new PostsApiService();

const fetchShirtsData = async () => {
  shirts.value = await postsService.getPosts();
}

onMounted(async () => {
  await fetchShirtsData();
})
</script>

<template>
  <div 
    class="catalogue-container"
    aria-describedby="Interactive jerseys catalogue with filters to browse">
    <filters/>
    <div class="shirts-container">
      <shirt-card
        v-for="shirt in shirts"
        :key="shirt.id"
        :id="shirt.id"
        :image-src="shirt.image"
        :name="shirt.name"
        name-router="shirtDescription"
        :ariaLabelRouter="`Read more about ${shirt.name}`"
      />
    </div>
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