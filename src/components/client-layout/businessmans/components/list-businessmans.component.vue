<script>
import ItemBusinessman from "@/components/client-layout/businessmans/components/item-businessman.component.vue";
import { BusinessmansApiService } from "@/components/client-layout/businessmans/services/businessmans-api.service.js";
import { businessMan } from "@/components/client-layout/businessmans/model/Businessman.entity.js";

export default {
  name: "list-businessmans",
  components: { ItemBusinessman },
  data() {
    return {
      businessmans: [],
      isLoading: true, // Estado para controlar el loader
      dataApi: new BusinessmansApiService(),
    };
  },
  created() {
    this.dataApi
      .getAllBusinessmansApiService()
      .then((response) => {
        this.businessmans = this.buildBusinessMansFromResponsiveData(response);
      })
      .finally(() => {
        this.isLoading = false; // Ocultar el loader al finalizar la carga
      });
  },
  methods: {
    buildBusinessMansFromResponsiveData(sellers) {
      return sellers.map(
        (seller) =>
          new businessMan(
            seller.id,
            seller.name,
            seller.lastname,
            seller.username,
            seller.email,
            seller.cellphone,
            seller.role
          )
      );
    },
  },
};
</script>

<template>
  <div v-if="isLoading" class="loader-section">
    <img src="/images/loanding.webp" alt="loader" class="loader" />
  </div>
  <div v-else v-for="man in this.businessmans">
  <item-businessman :business-entity="man"></item-businessman>
  </div>
</template>

<style scoped>
.loader {
  width: 16vw;
  height: 20vh;
}
.loader-section{
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>