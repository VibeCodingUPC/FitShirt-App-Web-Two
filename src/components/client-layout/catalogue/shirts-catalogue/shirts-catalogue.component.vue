<script setup>
import { onMounted, ref } from 'vue';
import filters from './shirt-filters.component.vue';
import shirtCard from '@/components/shared/shirt-components/shirt-card.component.vue';
import { PostsApiService } from '@/services/posts-api.service';

let shirts = ref([]);
let isLoading = ref(true); // Estado para controlar el loader
const postsService = new PostsApiService();

const fetchShirtsData = async () => {
  isLoading.value = true; // Mostrar loader al iniciar el fetch
  shirts.value = await postsService.getPosts();
  isLoading.value = false; // Ocultar loader al finalizar el fetch
};

onMounted(async () => {
  await fetchShirtsData();
});
</script>

<template>
  <div 
    class="catalogue-container"
    aria-describedby="Interactive jerseys catalogue with filters to browse">
    <filters/>
    <!-- Mostrar loader mientras se cargan los datos -->
    <div v-if="isLoading" class="loader-container">
      <img src="/images/loanding.webp" alt="loader" class="loader" />
    </div>
    <!-- Mostrar las camisetas una vez cargadas -->
    <div v-else class="shirts-container">
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
  ::v-deep .shirt-card {
    background-color: #e0e7ff;
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh; /* Ajustar según el diseño */
  }

  .loader {
    width: 16vw;
    height: 20vh;
  }
</style>
