<script setup>
import { onBeforeMount, ref } from 'vue';
import filters from './shirt-filters.component.vue';
import shirtCard from '@/components/shared/shirt-components/shirt-card.component.vue';
import {DesignsApiService} from "@/services/designs-api.service.js";
import { AccountApiService } from '@/services/account-api.service';

let designs=ref([]);
const designsService = new DesignsApiService();
const authApiService = new AccountApiService();

const fetchDesignsData = async () => {
  const userId = authApiService.getUserIdFromToken();
  console.log('User ID:', userId);

  try {
    const response = await designsService.getDesignsByUserId(userId);
    console.log('API Response:', response);

    designs.value = response.data ? response.data : response;
    console.log('Fetched Designs:', designs.value);
  } catch (error) {
    console.error('Error fetching designs:', error);
  }
}


onBeforeMount(async () => {
  await fetchDesignsData();
})
</script>

<template>
  <div
      class="catalogue-container"
      aria-describedby="Catalog of designs made by the user">
    <div v-if="designs.length > 0" class="shirts-container">
      <shirt-card
          v-for="design in designs"
          :key="design.id"
          :id="design.id"
          :image-src="design.image"
          :name="design.name"
          name-router="editDesign"
          :ariaLabelRouter="`Edit design ${design.name}`"
      />
    </div>
    <div v-else>
      <p>No designs available</p>
    </div>
    <filters/>
  </div>
</template>


<style scoped>
.catalogue-container {
  flex: 0.95;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.shirts-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 20px 0;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
}

.shirt-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 350px;
}

.shirt-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.no-designs-text {
  color: #3B82F6;
  font-size: 1.4em;
  text-align: center;
  margin-bottom: 10px;
}

.design-limit {
  color: #000000;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.filters-container {
  margin-top: 30px;
  width: 100%;
  max-width: 1200px;
}

@media (max-width: 768px) {
  .shirts-container {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 10px;
  }

  .shirt-card {
    width: 90%;
    max-width: none;
  }

  .no-designs-text {
    font-size: 1.2em;
  }

  .design-limit {
    font-size: 1em;
  }

  .filters-container {
    width: 100%;
    padding: 10px;
  }
}


</style>