<script setup>
import { onBeforeMount, ref } from 'vue';
import filters from './shirt-filters.component.vue';
import shirtCard from '../../shared/shirt-components/shirt-card.component.vue';
import {DesignsApiService} from "@/services/designs-api.service.js";
import { environment } from '@/environments/environment';

let designs=ref([]);
const designsService = new DesignsApiService();

const fetchDesignsData = async () => {
  designs.value = await designsService.getDesignsByUserId(environment.userId);
}

onBeforeMount(async () => {
  fetchDesignsData();
})
</script>

<template>
  <div
      class="catalogue-container"
      aria-describedby="Catalog of designs made by the user">
    <div class="shirts-container">
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