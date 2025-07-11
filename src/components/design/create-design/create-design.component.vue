<script setup>
import {computed, onMounted, ref} from "vue";
import {DesignsApiService} from "@/services/designs-api.service.js";
import {ColorApiService} from "@/services/color-api.service.js";
import {ShieldApiService} from "@/services/shield-api.service.js";
import { environment } from "@/environments/environment";
import router from "@/routes";
import { AccountApiService } from "@/services/account-api.service";

const colorService = new ColorApiService();
const designservice = new DesignsApiService();
const shieldService = new ShieldApiService();
const authApiService = new AccountApiService();

let designInformation = ref ({
  "name": "",
  "primaryColorId": 0,
  "secondaryColorId": 0,
  "tertiaryColorId": 0,
  "shieldId": 0,
  "userId": authApiService.getUserIdFromToken()
})
const colors = ref([]);
const shields = ref([]);

const addDesign = async () => {
  await designservice.creatingDesign(designInformation.value);
}

const fetchShieldData = async () => {
  let fetchedShields = await shieldService.getShield();
  shields.value = [...shields.value, ...fetchedShields];
}
const fetchColorData = async () => {
  let fetchedColors = await colorService.getColors();
  colors.value = [...colors.value, ...fetchedColors];
}

const areCorrectAllInputs = computed(() => {
  if (designInformation.value.name === "") {
    return false;
  }

  if (designInformation.value.primaryColorId === 0) {
    return false;
  }

  if (designInformation.value.secondaryColorId === 0) {
    return false;
  }

  if (designInformation.value.tertiaryColorId === 0) {
    return false;
  }

  if (designInformation.value.shieldId === 0) {
    return false;
  }

  return true
})

const handleDesignCreation = async () => {
  await addDesign();
  router.push("/my-design")
}


onMounted(async () => {
  fetchColorData();
  fetchShieldData();
})
</script>

<template>
  <pv-card class="card-container">
    <template #content>
      <div class="form-container">
        <div class="title-text">
          {{ $t('designs.create') }}
        </div>

        <img :src="environment.designImagePath" class="image-container"/>

        <div class="inputs-container">
          <div class="subtitle-text">{{ $t('designs.name') }}</div>
          <pv-inputText class="info-container" v-model="designInformation.name"></pv-inputText>

          <div class="subtitle-text">{{ $t('designs.fColor') }} </div>
          <select v-model="designInformation.primaryColorId" id="color-input">
            <option
                v-for="color in colors"
                :value="color.id"
                :key="color.id">
              {{ color.name }}
            </option>
          </select>

          <div class="subtitle-text">{{ $t('designs.sColor') }}</div>
          <select v-model="designInformation.secondaryColorId" id="color-input">
            <option
                v-for="color in colors"
                :value="color.id"
                :key="color.id">
              {{ color.name }}
            </option>
          </select>

          <div class="subtitle-text">{{ $t('designs.tColor') }}</div>
          <select v-model="designInformation.tertiaryColorId" id="color-input">
            <option
                v-for="color in colors"
                :value="color.id"
                :key="color.id">
              {{ color.name }}
            </option>
          </select>

          <div class="subtitle-text">{{ $t('designs.shield') }}</div>
          <select v-model="designInformation.shieldId" id="color-input">
            <option
                v-for="shield in shields"
                :value="shield.id"
                :key="shield.id">
              {{ shield.nameTeam }}
            </option>
          </select>
        </div>
      </div>
      <div class="button-container">
        <pv-button
            class="button-style"
            aria-label="Confirm a design"
            :disabled="!areCorrectAllInputs"
            @click="handleDesignCreation">
          {{ $t('designs.confirmButton') }}
        </pv-button>
        <router-link to="/my-design" aria-label="Cancel a design">
          <pv-button class="button-style">{{ $t('designs.cancelButton') }}</pv-button>
        </router-link>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.card-container{
  background-color: #dadada;
  height: 100%;
  display: flex;
  justify-content: center;
  flex: .95;
  align-self: center;
}
.form-container {
  background-color: #dadada;
  padding: 20px;
  flex-direction: column;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.button-container {
  margin-top: 30px;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: .8em 0;
}
.button-style {
  padding: .4em 1.8em;
  margin: .2em 0;
  border-radius: 6px;
  font-size: .9em;
  cursor: pointer;
  background-color: #4D94FF;
  color: #E5E5E5;
}
.inputs-container {
  width: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: .4em;
}
.title-text {
  font-size: 2.8em;
  font-weight: 600;
  font-family: Roboto,math;
  color: #000000;
  margin-bottom: 30px;
}
.subtitle-text {
  font-size: 20px;
  font-family: Roboto,math;
  color: #000000;
}
.info-container {
  border-radius: 4px;
  background-color: #ffffff;
  width: 100%;
}

.image-container{
  height: 220px;
  object-fit: contain;
  margin: 5px;
}

select {
  border-radius: 4px;
  padding: .8em;
}
</style>