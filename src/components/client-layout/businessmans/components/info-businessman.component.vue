<script>

import {BusinessmansApiService} from "@/components/client-layout/businessmans/services/businessmans-api.service.js";
import {PostsApiService} from "@/services/posts-api.service.js";

export default {
  name: "info-businessman",
  data(){
    return {
      businessman:[],
      dataApi: new BusinessmansApiService(),
      post:[],
    }
  },
  created(){

      this.dataApi.getBusinessmansByIdApiService(this.$route.params.id)
      .then((response) => {
      let dataMans = response;
      this.businessman = dataMans;
      })

 }
}


</script>

<template>
  <pv-card class="businessman-card">
    <template #header>
      <!-- Aquí podrías agregar una imagen si es necesario -->
    </template>
    <template #title>
      <h3 class="businessman-name">{{ businessman.name }} {{ businessman.lastname }}</h3>
    </template>
    <template #subtitle>
      <p class="businessman-username">@{{ businessman.username }}</p>
    </template>
    <template #content>
      <div class="contact-info">
        <p><strong>E-mail:</strong> {{ businessman.email }}</p>
        <p><strong>Celular:</strong> {{ businessman.cellphone }}</p>
      </div>
    </template>
  </pv-card>


</template>

<style scoped>
.businessman-card {
  width: 25rem;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
}

.businessman-name {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  padding: 8px 0;
}

.businessman-username {
  font-size: 1rem;
  color: #666;
  margin: 0;
  padding: 4px 0;
  font-style: italic;
}

.contact-info {
  font-size: 0.95rem;
  color: #555;
  padding-top: 8px;
}

.contact-info p {
  margin: 4px 0;
}
</style>