<script setup>
import { onBeforeMount, onMounted, ref, computed } from "vue";
import { DesignsApiService } from "@/services/designs-api.service.js";
import { useRoute } from "vue-router";
import { ColorApiService } from "@/services/color-api.service.js";
import { ShieldApiService } from "@/services/shield-api.service.js";
import router from "@/routes";

const route = useRoute();

const colorService = new ColorApiService();
const designsService = new DesignsApiService();
const shieldService = new ShieldApiService();

let designInformation = ref({
  id: 0,
  name: "",
  image: "",
  primaryColorId: 0,
  secondaryColorId: 0,
  tertiaryColorId: 0,
  shieldId: 0,
  userId: 0,
});

const constructDesignToUpdate = (gottenDesign) => {
  designInformation.value.id = gottenDesign.id;
  designInformation.value.name = gottenDesign.name;
  designInformation.value.image = gottenDesign.image;
  designInformation.value.primaryColorId = gottenDesign.primaryColor.id;
  designInformation.value.secondaryColorId = gottenDesign.secondaryColor.id;
  designInformation.value.tertiaryColorId = gottenDesign.tertiaryColor.id;
  designInformation.value.shieldId = gottenDesign.shield.id;
  designInformation.value.userId = gottenDesign.user.id;
};

const colors = ref([]);
const shields = ref([]);

const editDesign = async () => {
  await designsService.editDesign(designInformation.value);
};

const deleteItemDesign = async () => {
  await designsService.deleteDesign(designInformation.value.id);
};

const fetchDesignData = async () => {
  let gottenDesign = await designsService.getDesignbyid(route.params.id);
  constructDesignToUpdate(gottenDesign);
};

const fetchColorData = async () => {
  let fetchedColors = await colorService.getColors();
  colors.value = [...colors.value, ...fetchedColors];
};

const fetchShieldData = async () => {
  let fetchedShields = await shieldService.getShield();
  shields.value = [...shields.value, ...fetchedShields];
};

const areCorrectAllInputs = computed(() => {
  return (
      designInformation.value.name &&
      designInformation.value.primaryColorId &&
      designInformation.value.secondaryColorId &&
      designInformation.value.tertiaryColorId &&
      designInformation.value.shieldId
  );
});

const handleModifyDesign = async () => {
  await editDesign();
  router.push("/my-design");
};

const handleDeleteDesign = async () => {
  await deleteItemDesign();
  router.push("/my-design");
};

onMounted(async () => {
  fetchColorData();
  fetchShieldData();
});
onBeforeMount(() => {
  fetchDesignData();
});
</script>

<template>
  <pv-card class="card-container">
    <template #content>
      <div class="form-container">
        <div class="title-text">{{ $t("designs.edit") }}</div>

        <img :src="designInformation.image" class="image-container" />

        <div class="inputs-container">
          <div class="subtitle-text">{{ $t("designs.name") }}</div>
          <pv-inputText
              class="info-container"
              v-model="designInformation.name"
          ></pv-inputText>

          <div class="subtitle-text">{{ $t("designs.fColor") }} </div>
          <select v-model="designInformation.primaryColorId" id="color-input">
            <option v-for="color in colors" :value="color.id" :key="color.id">
              {{ color.name }}
            </option>
          </select>

          <div class="subtitle-text">{{ $t("designs.sColor") }}</div>
          <select v-model="designInformation.secondaryColorId" id="color-input">
            <option v-for="color in colors" :value="color.id" :key="color.id">
              {{ color.name }}
            </option>
          </select>

          <div class="subtitle-text">{{ $t("designs.tColor") }}</div>
          <select v-model="designInformation.tertiaryColorId" id="color-input">
            <option v-for="color in colors" :value="color.id" :key="color.id">
              {{ color.name }}
            </option>
          </select>

          <div class="subtitle-text">{{ $t("designs.shield") }}</div>
          <select v-model="designInformation.shieldId" id="color-input">
            <option v-for="shield in shields" :value="shield.id" :key="shield.id">
              {{ shield.nameTeam }}
            </option>
          </select>
        </div>
      </div>
      <div class="button-container">
        <pv-button
            class="button-style"
            aria-label="Apply changes"
            :disabled="!areCorrectAllInputs"
            @click="handleModifyDesign"
        >
          {{ $t("designs.confirmButton") }}
        </pv-button>
        <router-link to="/my-design">
          <pv-button class="button-style" aria-label="Cancel changes">
            {{ $t("designs.cancelButton") }}
          </pv-button>
        </router-link>
        <pv-button
            class="button-style"
            @click="handleDeleteDesign"
            aria-label="Delete a Design"
        >
          {{ $t("designs.deleteButton") }}
        </pv-button>
        <!-- New Button Added -->
        <router-link :to="{ path: '/businessman-list', meta: { requiresAuth: true, userRole: 'CLIENT' } }">
          <pv-button class="button-style" aria-label="Businessman List">
            {{ $t("designs.businessmanListButton") }}
          </pv-button>
        </router-link>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.card-container {
  height: 100%;
  display: flex;
  justify-content: center;
  flex: 0.95;
  align-self: center;
  background-color: #e0e7ff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.form-container {
  padding: 20px;
  flex-direction: column;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.inputs-container {
  width: 85%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 15px;
}

.title-text {
  font-size: 2.4em;
  font-weight: 700;
  font-family: "Roboto", sans-serif;
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
  grid-column: span 2;
}

.subtitle-text {
  font-size: 1.2em;
  font-family: "Roboto", sans-serif;
  color: #3b82f6;
}

.info-container {
  border-radius: 8px;
  background-color: #ffffff;
  width: 100%;
  border: 1px solid #3b82f6;
  padding: 0.8em;
}

select {
  border-radius: 8px;
  padding: 0.8em;
  border: 1px solid #3b82f6;
  background-color: #ffffff;
  font-size: 1em;
  color: #333333;
}

.image-container {
  height: 200px;
  object-fit: contain;
  margin: 5px;
  border-radius: 12px;
  border: 1px solid #e0e7ff;
  grid-column: span 2;
  justify-self: center;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  grid-column: span 2;
}

.button-style {
  padding: 0.4em 1.6em;
  margin: 0.2em 0;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  background-color: #4d94ff;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease;
}

.button-style:hover {
  background-color: #3b82f6;
}
</style>
