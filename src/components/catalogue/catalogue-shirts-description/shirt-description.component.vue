<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { PostsApiService } from '@/services/posts-api.service';
import { useCart } from '@/hooks/useCart';

const route = useRoute();
const postsService = new PostsApiService();

let shirtInformation = ref(null)
let selectedSize = ref(1);
let selectedQuantity = ref(1);

const reduceSelectedQuantity = () => {
  if (selectedQuantity.value>1) selectedQuantity.value--;
}

const increaseSelectedQuantity = () => {
  if (selectedQuantity.value<shirtInformation.value["stock"]) selectedQuantity.value++;
}

const { addToCart } = useCart();

const addItemToCart = () => {
  let sizeObject = shirtInformation.value['sizes'].find(size => size['size'].id === selectedSize.value)['size'];

  const item = {
    "sizeId": sizeObject['id'],
    "postId": route.params.id,
    "image": shirtInformation.value['image'],
    "name": shirtInformation.value['name'],
    "quantity": selectedQuantity.value,
    "price": shirtInformation.value['price'],
    "size": sizeObject['value']
  };

  addToCart(item);
};

const fetchShirtInformation = async () => {
  shirtInformation.value = await postsService.getPostById(route.params.id);
}

onMounted(() => {
  fetchShirtInformation();
})

</script>

<template>
  <div
      class="shirt-description-container"
      aria-describedby="Contains jersey description like name, price, seller, size, color and stock"
      v-if="shirtInformation">
    <div class="shirt-details">
      <div class="shirt-detail" id="category">
        <h3 aria-describedby="Jersey category">/{{ shirtInformation["category"]["name"] }} Jersey</h3>
      </div>
      <div class="shirt-detail" id="name">
        <h1 aria-describedby="Jersey name">{{ shirtInformation["name"] }}</h1>
      </div>
      <div class="shirt-detail" id="price">
        <h2 aria-describedby="Jersey price">S/.{{ shirtInformation["price"]?.toFixed(2) }}</h2>
      </div>

      <div class="shirt-detail" id="size">
        <label for="size-selection">{{ $t('catalogueDesc.sizes') }}:</label>
        <select v-model="selectedSize" id="size-selection">
          <option
              v-for="size in shirtInformation['sizes']"
              :value="size['size']['id']">
            {{size['size']['value']}}
          </option>
        </select>
      </div>

      <div class="shirt-detail">
        <h2 aria-describedby="Jersey color"><b>{{ $t('catalogueDesc.color') }}:</b> {{ shirtInformation["color"]["name"] }}</h2>
      </div>

      <div class="shirt-detail">
        <h2 aria-describedby="Jersey stock"><b>{{ $t('catalogueDesc.stock') }}:</b> {{ shirtInformation["stock"] }} {{ $t('catalogueDesc.availables') }}</h2>
      </div>

      <div class="shirt-detail" id="quantity-detail">
        <h2><b>{{ $t('catalogueDesc.quantity') }}:</b></h2>
        <div className="quantity">
          <button
              class="quantity-minus"
              :onClick="reduceSelectedQuantity"
              aria-label="Reduce quantity by one">
            -
          </button>
          <span aria-label="Quantity to purchase">{{ selectedQuantity }}</span>
          <button
              class="quantity-plus"
              :onClick="increaseSelectedQuantity"
              aria-label="Increase quantity by one"
          >
            +
          </button>
        </div>
      </div>

      <div class="shirt-detail" id="card-detail">
        <button
            aria-label="Add to cart"
            :onClick="addItemToCart">{{ $t('catalogueDesc.cart') }}</button>
      </div>

      <div class="shirt-detail" id="seller-detail">
        <h2 aria-describedby="Jersey detail"><b>{{ $t('catalogueDesc.sold') }}:</b> {{ shirtInformation["user"]["name"] }} </h2>
      </div>
    </div>

    <div class="shirt-image">
      <img
          :src="shirtInformation['image']"
          :alt="shirtInformation['name'] + ' image'"
          :aria-label="shirtInformation['name'] + ' image'"
      >
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.shirt-description-container {
  display: flex;
  flex-direction: row;
  padding: 1em;
  flex: .95;
  align-self: center;
  background-color: #ffffff; /* Fondo blanco */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Detalles de la camiseta */
.shirt-details {
  flex: 1;
  padding: 20px;
  background-color: #e0e7ff; /* Fondo azul claro */
  border-radius: 12px;
}

.shirt-detail {
  margin: .6em 0;
}

.shirt-detail b {
  font-weight: 600;
  color: #3B82F6; /* Azul principal */
}

#category {
  font-size: .9em;
  font-style: italic;
  color: #4d94ff; /* Azul más claro */
}

#name {
  font-size: 1.8em;
  font-weight: 600;
  text-align: center;
  color: #3B82F6;
}

#price {
  font-size: 1.6em;
  font-weight: 500;
  text-align: center;
  color: #4d94ff;
}

#size {
  display: flex;
  flex-direction: column;
}

#size label {
  font-weight: 600;
  margin-bottom: .4em;
}

#size select {
  padding: .6em;
  margin: auto;
  width: 220px;
  border-radius: 12px;
  border: 1px solid #4d94ff;
  background-color: #ffffff;
}

/* Cantidad */
#quantity-detail .quantity {
  margin: auto;
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#quantity-detail .quantity button {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: #4d94ff; /* Botones en azul */
  color: #ffffff;
  cursor: pointer;
  border: none;
}

#card-detail button {
  padding: .6em 2em;
  margin: .2em 0;
  border-radius: 6px;
  font-size: 1.1em;
  cursor: pointer;
  background-color: #3B82F6;
  color: #ffffff; /* Texto en blanco */
  border: none;
}

#seller-detail {
  font-size: .85em;
  text-align: end;
  color: #4d94ff;
}

/* Imagen de la camiseta */
.shirt-image {
  width: 400px;
  height: 400px;
  display: flex;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e7ff;
}

.shirt-image img {
  max-width: 100%;
  height: 300px;
  margin: auto;
  object-fit: contain;
}

/* Media Queries para móviles */
@media (max-width: 880px) {
  .shirt-description-container {
    flex-direction: column-reverse;
    height: auto;
  }

  .shirt-details,
  .shirt-image {
    width: 100%;
    padding: 10px;
  }

  .shirt-image {
    margin: 0;
    height: auto;
  }
}
</style>
