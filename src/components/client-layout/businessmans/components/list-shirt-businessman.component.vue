<script>
import { BusinessmansApiService } from "@/components/client-layout/businessmans/services/businessmans-api.service.js";
import { ShirtEntity } from "@/components/client-layout/businessmans/model/Shirt.entity.js";
import ShirtBusinessman from "@/components/client-layout/businessmans/components/shirt-businessman.component.vue";

export default {
  name: "list-shirt-businessman",
  components: { ShirtBusinessman },
  data() {
    return {
      shirtLists: [],
      isLoading: true, // Estado para controlar el loader
      shirtApi: new BusinessmansApiService(),
    };
  },
  created() {
    this.shirtApi
      .getPostByUserId2(this.$route.params.id)
      .then((response) => {
        let dataShirt = response.data;
        this.shirtLists = this.buildShirtFromResponsiveData(dataShirt);
      })
      .finally(() => {
        this.isLoading = false; // Ocultar el loader al finalizar la carga
      });
  },
  methods: {
    buildShirtFromResponsiveData(shirts) {
      return shirts.map(
        (shirt) =>
          new ShirtEntity(
            shirt.id,
            shirt.name,
            shirt.image
          )
      );
    },
  },
};
</script>

<template>
  <div>
    <!-- Mostrar loader mientras se cargan los datos -->
    <div v-if="isLoading" class="loader-container">
      <img src="/images/loanding.webp" alt="loader" class="loader" />
    </div>
    <!-- Mostrar la lista de camisetas una vez cargados -->
    <div v-else class="shirts-list-businessman">
      <div v-for="shirt in shirtLists" :key="shirt.id">
        <shirt-businessman :shirt-entity="shirt"></shirt-businessman>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Ajustar según el diseño */
}

.shirts-list-businessman {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tres columnas en la fila */
  gap: 20px; /* Espaciado entre elementos */
}

.loader {
  width: 16vw;
  height: 20vh;
}
</style>