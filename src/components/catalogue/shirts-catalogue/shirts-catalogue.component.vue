<script setup>
import { onMounted, ref } from 'vue';
import Filters from './shirt-filters.component.vue';
import ShirtCard from '../../shared/shirt-components/shirt-card.component.vue';
import { PostsApiService } from '@/services/posts-api.service';
import { CategoryApiService } from '@/services/category-api.service';
import { ColorApiService } from '@/services/color-api.service';

let filteredShirts = ref([]);
const selectedFilters = ref({ category: "Any", color: "Any" });
const categories = ref([]);
const colors = ref([]);
const postsService = new PostsApiService();
const categoryService = new CategoryApiService();
const colorService = new ColorApiService();

const fetchCategoriesAndColors = async () => {
  categories.value = await categoryService.getCategories();
  colors.value = await colorService.getColors();
};

const getCategoryIdByName = (categoryName) => {
  if (categoryName === "Any") return null;
  const category = categories.value.find(cat => cat.name === categoryName);
  return category ? category.id : null;
};

const getColorIdByName = (colorName) => {
  if (colorName === "Any") return null;
  const color = colors.value.find(col => col.name === colorName);
  return color ? color.id : null;
};

const handleFilterChange = async (newFilters) => {
  selectedFilters.value = newFilters;
  const categoryId = getCategoryIdByName(selectedFilters.value.category);
  const colorId = getColorIdByName(selectedFilters.value.color);

  try {
    filteredShirts.value = await postsService.filterPosts(categoryId, colorId);
  } catch (error) {
    console.error("Error al obtener las camisetas filtradas:", error);
  }
};

onMounted(async () => {
  await fetchCategoriesAndColors();
  await handleFilterChange(selectedFilters.value);
});
</script>

<template>
  <div class="catalogue-container">
    <filters @filterChanged="handleFilterChange"/>
    <div class="shirts-container">
      <shirt-card
          v-for="shirt in filteredShirts"
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
