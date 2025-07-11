<script setup>
import { CategoryApiService } from "@/services/category-api.service";
import { ColorApiService } from "@/services/color-api.service";
import { onMounted, ref } from 'vue';

const categoryService = new CategoryApiService();
const colorService = new ColorApiService();

const selectedCategory = ref("Any");
const categories = ref([
  {"id": 99,"name": "Any" }
]);


const selectedColor = ref("Any");
const colors = ref([
  { "id": 99, "name": "Any" },
]);

const fetchCategoryData = async () => {
  let fetchedCategories = await categoryService.getCategories();
  categories.value = [...categories.value, ...fetchedCategories];
}

const fetchColorData = async () => {
  let fetchedColors = await colorService.getColors();
  colors.value = [...colors.value, ...fetchedColors];
}

onMounted(async () => {
  fetchCategoryData();
  fetchColorData();
})
</script>

<template>
  <div class="filter-container" aria-describedby="Browser filters">
    <form class="filter-form">
      <div class="input-container" aria-describedby="Category filter">
        <label for="category-input">
          {{ $t('catalogue.category') }}:
        </label>
        <select v-model="selectedCategory" id="category-input">
          <option
              v-for="category in categories"
              :value="category.name"
              :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="input-container" aria-describedby="Color filter">
        <label for="color-input">
          {{ $t('catalogue.color') }}:
        </label>
        <select v-model="selectedColor" id="color-input">
          <option
              v-for="color in colors"
              :value="color.name"
              :key="color.id || color.name">
            {{color.name}}
          </option>
        </select>
      </div>
      <button class="form-button" aria-label="Apply filters">
        {{ $t('catalogue.filterButton') }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.filter-container {
  padding: .4em;
}
.filter-container .filter-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.filter-container .filter-form .input-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: .4em;
}
.filter-container .filter-form .input-container label {
  margin-right: .4em;
}
.filter-container .filter-form .input-container select {
  align-items: center;
  width: 140px;
  font-size: .8rem;
  padding: .3em;
  border: solid black 1px;
  border-radius: 6px;
}
.filter-container .filter-form .form-button {
  background-color: #4D94FF;
  padding: .8em 2.8em;
  border-radius: 8px;
  color: #E5E5E5;
  font-size: .8em;
  font-weight: 600;
  cursor: pointer;
}
</style>