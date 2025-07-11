<script setup>
import {onBeforeMount, onMounted, ref, computed} from "vue";
import {DesignsApiService} from "@/services/designs-api.service.js";
import {useRoute} from "vue-router";
import {ColorApiService} from "@/services/color-api.service.js";
import {ShieldApiService} from "@/services/shield-api.service.js";
import router from "@/routes";

const route = useRoute();

const colorService = new ColorApiService();
const designsService = new DesignsApiService();
const shieldService = new ShieldApiService();

let designInformation = ref({
  "id": 0,
  "name": "",
  "image": "",
  "primaryColorId": 0,
  "secondaryColorId": 0,
  "tertiaryColorId": 0,
  "shieldId": 0,
  "userId": 0
});

const constructDesignToUpdate = ( gottenDesign ) => {
  designInformation.value.id = gottenDesign.id;
  designInformation.value.name = gottenDesign.name;
  designInformation.value.image = gottenDesign.image;
  designInformation.value.primaryColorId = gottenDesign.primaryColor.id;
  designInformation.value.secondaryColorId = gottenDesign.secondaryColor.id;
  designInformation.value.tertiaryColorId = gottenDesign.tertiaryColor.id;
  designInformation.value.shieldId = gottenDesign.shield.id;
  designInformation.value.userId = gottenDesign.user.id;
}

const colors = ref([]);
const shields = ref([]);

const editDesign = async () => {
  await designsService.editDesign(designInformation.value);
}

const deleteItemDesign = async () => {
  await designsService.deleteDesign(designInformation.value.id);
}

const fetchDesignData = async () => {
  let gottenDesign = await designsService.getDesignbyid(route.params.id);
  constructDesignToUpdate(gottenDesign);
}

const fetchColorData = async () => {
  let fetchedColors = await colorService.getColors();
  colors.value = [...colors.value, ...fetchedColors];
}
const fetchShieldData = async () => {
  let fetchedShields = await shieldService.getShield();
  shields.value = [...shields.value, ...fetchedShields];
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

const handleModifyDesign = async () => {
  await editDesign();
  router.push('/my-design');
}

const handleDeleteDesign = async () => {
  await deleteItemDesign();
  router.push('/my-design');
}

onMounted(async () => {
  fetchColorData();
  fetchShieldData();
})
onBeforeMount(()=>{
  fetchDesignData();
})

</script>

<template>
  <pv-card class="card-container">
    <template #content>
      <div class="form-container">
        <div class="title-text">{{ $t('designs.edit') }}</div>

        <img :src="designInformation.image" class="image-container"/>

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
            aria-label="Apply changes"
            :disabled="!areCorrectAllInputs"
            @click="handleModifyDesign">
          {{ $t('designs.confirmButton') }}
        </pv-button>
        <router-link to="/my-design">
          <pv-button class="button-style" aria-label="Cancel changes">{{ $t('designs.cancelButton') }}</pv-button>
        </router-link>
        <pv-button
            class="button-style"
            @click="handleDeleteDesign"
            aria-label="Delete a Design">
          {{ $t('designs.deleteButton') }}
        </pv-button>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.card-container{
  height: 100%;
  display: flex;
  justify-content: center;
  flex: .95;
  align-self: center;
}
.form-container {
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
.subitem-container{
  background-color: #cacaca;
  padding: 20px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.image-container{
  height: 220px;
  object-fit: contain;
  margin: 5px;
}

.subitem-container{
  background-color: #cacaca;
  padding: 20px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
select {
  border-radius: 4px;
  padding: .8em;
}
</style>