<script>
import { BusinessmansApiService } from "@/components/client-layout/businessmans/services/businessmans-api.service.js";

export default {
  name: "info-businessman",
  data() {
    return {
      businessman: null, // Cambiar a null para diferenciar entre cargado o vacío
      isLoading: true, // Estado para controlar el loader
      dataApi: new BusinessmansApiService(),
    };
  },
  created() {
    this.dataApi
      .getBusinessmansByIdApiService(this.$route.params.id)
      .then((response) => {
        this.businessman = response;
      })
      .finally(() => {
        this.isLoading = false; // Ocultar el loader al finalizar la carga
      });
  },
};
</script>

<template>
  <div>
    <!-- Mostrar loader mientras se cargan los datos -->
    <div v-if="isLoading" class="loader-container">
      <img src="/images/loanding.webp" alt="loader" class="loader" />
    </div>

    <!-- Mostrar la tarjeta del businessman una vez cargados los datos -->
    <pv-card v-else class="businessman-card">
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
  </div>
</template>

<style scoped>
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
