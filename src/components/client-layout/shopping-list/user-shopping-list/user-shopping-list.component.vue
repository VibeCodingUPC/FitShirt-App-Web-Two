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
      <h2 class="list-title">Listado de Compras</h2>
      <div v-if="cart.length === 0" class="empty-message">
        <p>No hay artículos en el carrito.</p>
      </div>

      <!-- Items del listado de compras -->
      <div v-else class="items-wrapper">
        <div v-for="(item, i) in cart" :key="i" class="item-container">
          <img :src="item.image" alt="Item Image" class="image-container"/>
          <div class="item-details">
            <p><strong>Nombre:</strong> {{ item.name }}</p>
            <p><strong>Cantidad:</strong> {{ item.quantity }}</p>
            <p><strong>Precio unitario:</strong> S/. {{ item.price.toFixed(2) }}</p>
            <p><strong>Tamaño:</strong> {{ item.size }}</p>
            <p><strong>Subtotal:</strong> S/. {{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
          <pv-button @click="removeFromCart(item.postId, item.sizeId)" class="trash-button" aria-label="Eliminar">
            <img src="/images/bin.png" alt="Eliminar" class="bin-container">
          </pv-button>
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
  padding: 20px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Centrado vertical */
}

.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px; /* Ancho máximo centrado */
}

.list-title {
  font-size: 1.8em;
  margin-bottom: 20px;
  color: #333;
  text-align: center; /* Centramos el título */
}

.empty-message {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.items-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Alinea los elementos al centro */
}

.item-container {
  background-color: #ffffff;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image-container {
  height: 80px;
  width: 80px;
  margin-right: 20px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #555;
}

.trash-button {
  background-color: transparent;
  cursor: pointer;
  padding: 5px;
  border: none;
}

.bin-container {
  height: 24px;
  width: 24px;
}

.footer-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: right;
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .item-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .image-container {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }

  .footer-container {
    font-size: 1em;
    text-align: center; /* Alineamos el total al centro en móviles */
  }
}
</style>
