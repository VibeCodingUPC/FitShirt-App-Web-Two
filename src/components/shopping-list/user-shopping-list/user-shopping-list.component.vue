<script setup>
import { ref, computed } from 'vue';
import { useCart } from '@/hooks/useCart';

const { cart, removeFromCart } = useCart();

// Cálculo dinámico del subtotal
const subtotal = computed(() => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
});
</script>

<template>
  <div class="main-container" aria-describedby="Shopping list detail">
    <div class="list-container">
      <h2>Listado de Compras</h2>
      <div v-if="cart.length === 0" class="empty-message">
        <p>No hay artículos en el carrito.</p>
      </div>

      <!-- Items del listado de compras -->
      <div v-else>
        <div v-for="(item, i) in cart" :key="i" class="item-container">
          <img :src="item.image" alt="Item Image" class="image-container"/>
          <div class="item-details">
            <p><strong>Nombre:</strong> {{ item.name }}</p>
            <p><strong>Cantidad:</strong> {{ item.quantity }}</p>
            <p><strong>Precio unitario:</strong> S/. {{ item.price.toFixed(2) }}</p>
            <p><strong>Tamaño:</strong> {{ item.size }}</p>
            <p><strong>Subtotal:</strong> S/. {{ (item.price * item.quantity).toFixed(2) }}</p>
            <pv-button @click="removeFromCart(item.postId, item.sizeId)" class="trash-button">
              <img src="/images/bin.png" alt="Eliminar" class="bin-container">
            </pv-button>
          </div>
        </div>
        <div class="footer-container">
          <p><strong>Total de compras:</strong> S/. {{ subtotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background-color: #dadada;
  padding: 20px;
  flex: .95;
}

.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-message {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.item-container {
  background-color: #cacaca;
  padding: 20px;
  margin: 5px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.image-container {
  height: 30px;
  width: 30px;
  margin-right: 20px;
}

.item-details {
  flex: 1;
}

.trash-button {
  background-color: transparent;
  cursor: pointer;
  padding: 2px;
}

.bin-container {
  height: 16px;
  width: 16px;
}

.footer-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: right;
  font-size: 1.2em;
}
</style>
