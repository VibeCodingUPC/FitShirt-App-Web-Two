<script setup>
import { computed, onMounted, ref } from "vue";
import { PostsApiService } from "@/services/posts-api.service.js";
import { CategoryApiService } from "@/services/category-api.service.js";
import { ColorApiService } from "@/services/color-api.service.js";
import { SizeApiService } from "@/services/size-api.service.js";
import router from "@/routes";
import { AccountApiService } from "@/services/account-api.service";

const categoryService = new CategoryApiService();
const colorService = new ColorApiService();
const sizeService = new SizeApiService();
const postService = new PostsApiService();
const authApiService = new AccountApiService();

let postInformation = ref({
  "name": "",
  "categoryId": 0,
  "colorId": 0,
  "stock": 0,
  "userId": authApiService.getUserIdFromToken(),
  "sizeIds": [],
  "price": 0,
  "image": null
});

const categories = ref([]);
const colors = ref([]);
const sizes = ref([]);
const imagePreview = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    postInformation.value.image = file;

    imagePreview.value = URL.createObjectURL(file);
  }
};

const addPublish = async () => {
  const formData = new FormData();
  formData.append("name", postInformation.value.name);
  formData.append("categoryId", postInformation.value.categoryId);
  formData.append("colorId", postInformation.value.colorId);
  formData.append("stock", postInformation.value.stock);
  formData.append("userId", postInformation.value.userId);
  formData.append("price", postInformation.value.price);
  formData.append("image", postInformation.value.image);

  postInformation.value.sizeIds.forEach((sizeId) => {
    formData.append("sizeIds", sizeId);
  });

  console.log("Contenido de FormData antes de enviar:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    await postService.publishPost(formData);
    router.push("/published");
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.warn("Conflicto detectado, redirigiendo de todas formas.");
      router.push("/published");
    } else {
      console.error("Error al publicar:", error);
    }
  }
};



const fetchCategoryData = async () => {
  let fetchedCategories = await categoryService.getCategories();
  categories.value = [...categories.value, ...fetchedCategories];
};
const fetchColorData = async () => {
  let fetchedColors = await colorService.getColors();
  colors.value = [...colors.value, ...fetchedColors];
};
const fetchSizeData = async () => {
  let fetchedSizes = await sizeService.getSizes();
  sizes.value = [...sizes.value, ...fetchedSizes];
};

const isWrongInputs = computed(() => {
  if (postInformation.value.name.length === 0) {
    return true;
  }
  if (postInformation.value.colorId === 0) {
    return true;
  }
  if (postInformation.value.categoryId === 0) {
    return true;
  }
  if (postInformation.value.stock <= 0) {
    return true;
  }
  if (!Number.isInteger(Number(postInformation.value.stock))) {
    return true;
  }
  if (postInformation.value.sizeIds.length === 0) {
    return true;
  }
  if (!postInformation.value.image) {
    return true;
  }
  if (postInformation.value.price <= 0) {
    return true;
  }

  return false;
});

onMounted(async () => {
  fetchCategoryData();
  fetchColorData();
  fetchSizeData();
});
</script>

<template>
  <pv-card class="card-container">
    <template #content>
      <form class="form-container">
        <div class="title-text">{{ $t('posts.upload') }}</div>
        <div class="inputs-container">
          <div class="subtitle-text">{{ $t('posts.name') }}</div>
          <pv-inputText class="info-container" v-model="postInformation.name"></pv-inputText>

          <div class="subtitle-text">{{ $t('posts.color') }}</div>
          <select v-model="postInformation.colorId" id="color-input">
            <option v-for="color in colors" :value="color.id" :key="color.id">
              {{ color.name }}
            </option>
          </select>

          <div class="subtitle-text">{{ $t('posts.category') }}</div>
          <select v-model="postInformation.categoryId" id="category-input">
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.name }}
            </option>
          </select>

          <div class="subtitle-text">{{ $t('posts.quantity') }}</div>
          <pv-inputText class="info-container" type="number" min="0" step="1" v-model.number="postInformation.stock">
          </pv-inputText>

          <div class="subtitle-text">{{ $t('posts.sizes') }}</div>
          <div v-for="size in sizes" :key="size.id">
            <input type="checkbox" :id="size.id" :value="size.id" v-model="postInformation.sizeIds" />
            <label :for="size.id">{{ size.value }}</label>
          </div>

          <div class="subtitle-text">{{ $t('posts.image') }}</div>
          <input type="file" @change="handleFileChange" />
          <div v-if="imagePreview" class="image-preview">
            <p>{{ $t('posts.uploadedImage') }}</p>
            <img :src="imagePreview" alt="Preview" />
            <button type="button" @click="imagePreview = null; postInformation.image = null">{{ $t('posts.deleteImage') }}</button>
          </div>

          <div class="subtitle-text">{{ $t('posts.price') }}</div>
          <pv-inputText class="info-container" type="number" min="0" v-model.number="postInformation.price">
          </pv-inputText>
        </div>
        <div class="button-container">
          <pv-button class="button-style" aria-label="Confirmar publicación" :disabled="isWrongInputs" @click="addPublish">
            {{ $t('posts.confirmButton') }}
          </pv-button>
          <router-link to="/published">
            <pv-button class="button-style" aria-label="Cancelar publicación">{{ $t('posts.cancelButton') }}</pv-button>
          </router-link>
        </div>
      </form>
    </template>
  </pv-card>
</template>

<style scoped>
.card-container {
  background-color: #e0e7ff;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
}
.form-container {
  background-color: #ffffff;
  padding: 20px;
  flex-direction: column;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.button-container {
  margin-top: 30px;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.button-style {
  width: 263px;
  justify-content: center;
  background-color: #3B82F6;
  color: #ffffff;
}
.inputs-container {
  width: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: .4em;
}
.title-text {
  font-size: 2em;
  font-weight: bold;
  color: #3B82F6;
  margin-bottom: 1em;
}
.subtitle-text {
  font-size: 1.2em;
  color: #4d94ff;
}
.info-container {
  border-radius: 4px;
  background-color: #ffffff;
  width: 100%;
  border: 1px solid #4d94ff;
}
.image-preview img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .title-text {
    font-size: 1.8em;
  }

  .button-style {
    width: 100%;
  }
  .form-container[data-v-fc468dd1] {
    margin-top: 20px;

  }
}
</style>
