<script setup>
import { onBeforeMount, onMounted, ref, computed } from "vue";
import { useRoute } from 'vue-router';
import { PostsApiService } from "@/services/posts-api.service.js";
import { CategoryApiService } from "@/services/category-api.service.js";
import { ColorApiService } from "@/services/color-api.service.js";
import { SizeApiService } from "@/services/size-api.service.js";
import router from "@/routes";

// Configuración para Cloudinary
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/your-cloud-name/upload";
const UPLOAD_PRESET = "your-upload-preset";

const categoryService = new CategoryApiService();
const colorService = new ColorApiService();
const sizeService = new SizeApiService();
const postService = new PostsApiService();
const route = useRoute();

let postInformation = ref({
  name: "",
  image: "",
  stock: 0,
  price: 0,
  categoryId: 0,
  colorId: 0,
  userId: 0,
  sizeIds: [],
});

let idPost = ref(0);

const constructPostToUpdate = async (gottenPost) => {
  idPost.value = gottenPost.id;
  postInformation.value.name = gottenPost.name;
  postInformation.value.stock = gottenPost.stock;
  postInformation.value.price = gottenPost.price;
  postInformation.value.categoryId = gottenPost.category.id;
  postInformation.value.colorId = gottenPost.color.id;
  postInformation.value.userId = gottenPost.user.id;
  postInformation.value.sizeIds = gottenPost.sizes.map(size => size['size']['id']);

  if (gottenPost.image) {
    postInformation.value.image = await urlToFile(gottenPost.image, "image.jpg", "image/jpeg");
  }
};

const urlToFile = async (url, filename, mimeType) => {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], filename, { type: mimeType });
};


const fetchPostInformation = async () => {
  let gottenPost = await postService.getPostById(route.params.id);
  await constructPostToUpdate(gottenPost);
};

const categories = ref([]);
const colors = ref([]);
const sizes = ref([]);

const editPost = async () => {
  const formData = new FormData();
  formData.append("name", postInformation.value.name);
  formData.append("stock", postInformation.value.stock);
  formData.append("price", postInformation.value.price);
  formData.append("categoryId", postInformation.value.categoryId);
  formData.append("colorId", postInformation.value.colorId);
  formData.append("userId", postInformation.value.userId);

  if (postInformation.value.image instanceof File) {
    formData.append("image", postInformation.value.image);
  } else {
    formData.append("image", postInformation.value.image);
  }

  postInformation.value.sizeIds.forEach((sizeId) => {
    formData.append("sizeIds", sizeId);
  });

  try {
    await postService.editPost(idPost.value, formData);
    router.push("/published");
  } catch (error) {
    if (error.response) {
      console.error("Error al editar el post:", error.response.data);
    } else {
      console.error("Error al editar el post:", error);
    }
  }
};


const deleteItemPost = async () => {
  await postService.deletePost(postInformation.value.id);
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
  return (
      !postInformation.value.name ||
      !postInformation.value.colorId ||
      !postInformation.value.categoryId ||
      postInformation.value.stock <= 0 ||
      !Number.isInteger(Number(postInformation.value.stock)) ||
      !postInformation.value.sizeIds.length ||
      !postInformation.value.image ||
      postInformation.value.price <= 0
  );
});

onBeforeMount(() => {
  fetchPostInformation();
});

onMounted(async () => {
  fetchCategoryData();
  fetchColorData();
  fetchSizeData();
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    postInformation.value.image = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};


const handleModify = async () => {
  await editPost();
  router.push('/published');
};

const handleDelete = async () => {
  await deleteItemPost();
  router.push('/published');
};
</script>

<template>
  <pv-card class="card-container">
    <template #content>
      <form class="form-container">
        <div class="title-text">{{ $t('posts.edit') }}</div>
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
          <pv-inputText class="info-container" type="number" min="0" step="1"
                        v-model="postInformation.stock"></pv-inputText>

          <div class="subtitle-text">{{ $t('posts.sizes') }}</div>
          <div v-for="size in sizes" :key="size.id">
            <input type="checkbox" :id="size.id" :value="size.id" v-model="postInformation.sizeIds"/>
            <label :for="size.id">{{ size.value }}</label>
          </div>

          <div class="subtitle-text">{{ $t('posts.image') }}</div>
          <input type="file" @change="handleFileChange"/>
          <img v-if="postInformation.image" :src="postInformation.image" alt="Current Image" class="image-preview"/>

          <div class="subtitle-text">{{ $t('posts.price') }}</div>
          <pv-inputText class="info-container" type="number" min="0" v-model="postInformation.price"></pv-inputText>
        </div>
      </form>
      <div class="button-container">
        <pv-button class="button-style" :disabled="isWrongInputs" @click="handleModify">{{
            $t('posts.confirmButton')
          }}
        </pv-button>
        <router-link to="/published">
          <pv-button class="button-style">{{ $t('posts.cancelButton') }}</pv-button>
        </router-link>
        <pv-button @click="handleDelete" class="button-style">{{ $t('posts.deleteButton') }}</pv-button>
      </div>
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
  padding: 20px;
  justify-content: center;
}

.form-container {
  background-color: #ffffff;
  padding: 20px;
  flex-direction: column;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button-container {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.button-style {
  width: 263px;
  background-color: #3B82F6;
  color: #ffffff;
  border: none;
  border-radius: 4px;
}

.inputs-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.title-text {
  font-size: 2em;
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

.image-preview {
  max-width: 300px;
  height: auto;
  margin-top: 10px;
  border-radius: 8px;
}


select, input[type="checkbox"] {
  border-radius: 4px;
  padding: .8em;
}

@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }

  .title-text {
    font-size: 1.5em;
    text-align: center;
  }

  .button-style {
    width: 100%;
  }
}
</style>
