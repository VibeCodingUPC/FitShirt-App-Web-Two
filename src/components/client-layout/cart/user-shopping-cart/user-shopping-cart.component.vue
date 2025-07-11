<script setup>
import { ref, computed } from 'vue';
import { useCart } from '@/hooks/useCart';
import { AccountApiService } from '@/services/account-api.service';
import { PurchasesApiService } from '@/services/purchases-api.service';

const { cart, removeFromCart, clearCart } = useCart();
const purchasesService = new PurchasesApiService();
const authApiService = new AccountApiService();

const cardHolder = ref('');
const cardNumber = ref('');
const expirationDate = ref('');
const cvv = ref('');

const cardHolderError = ref('');
const cardNumberError = ref('');
const expirationDateError = ref('');
const cvvError = ref('');

const showSuccessModal = ref(false); // Controla la visibilidad de la ventana emergente de éxito

// Cálculo dinámico del subtotal
const subtotal = computed(() => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
});

const purchaseCreation = () => {
  let items = cart.map(item => ({
    "postId": item.postId,
    "sizeId": item.sizeId,
    "quantity": item.quantity
  }));

  let purchase = {
    "userId": authApiService.getUserIdFromToken(),
    "items": items
  };

  return purchase;
};

// Función de validación de entrada
const validateInputs = () => {
  let isValid = true;

  if (!cardHolder.value) {
    cardHolderError.value = 'El nombre del titular es obligatorio.';
    isValid = false;
  } else {
    cardHolderError.value = '';
  }

  const cardNumberPattern = /^[0-9]{16}$/;
  if (!cardNumberPattern.test(cardNumber.value)) {
    cardNumberError.value = 'Número de tarjeta inválido. Debe contener 16 dígitos.';
    isValid = false;
  } else {
    cardNumberError.value = '';
  }

  const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expirationPattern.test(expirationDate.value)) {
    expirationDateError.value = 'Fecha de vencimiento inválida. Debe estar en el formato MM/AA.';
    isValid = false;
  } else {
    expirationDateError.value = '';
  }

  const cvvPattern = /^[0-9]{3,4}$/;
  if (!cvvPattern.test(cvv.value)) {
    cvvError.value = 'CVV inválido. Debe contener 3 o 4 dígitos.';
    isValid = false;
  } else {
    cvvError.value = '';
  }

  return isValid;
};

const handlePurchase = async () => {
  console.log("Botón de compra presionado"); // Verificar que la función es llamada
  if (cart.length === 0) {
    console.log("Carrito vacío, no se procesa la compra");
    return;
  }

  if (validateInputs()) {
    console.log("Validación de entradas exitosa");
    let purchase = purchaseCreation();
    try {
      await purchasesService.postPurchase(purchase);
      console.log("Compra enviada al servicio con éxito");
      clearCart();
      showSuccessModal.value = true; // Muestra la ventana emergente de éxito
      console.log("Estado de showSuccessModal:", showSuccessModal.value);
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  } else {
    console.log("Validación de entradas fallida");
  }
};
</script>

<template>
  <div class="main-container" aria-describedby="Jersey cart detail">
    <div class="cart-container">
      <!-- Items del carrito -->
      <div v-for="(item, i) in cart" :key="i" class="item-container">
        <img :src="item.image" alt="Item-Image" class="image-container"/>
        <div class="item-details">
          <p><strong>Nombre:</strong> {{ item.name }}</p>
          <p><strong>Cantidad:</strong> {{ item.quantity }}</p>
          <p><strong>Precio unitario:</strong> S/. {{ item.price.toFixed(2) }}</p>
          <p><strong>Tamaño:</strong> {{ item.size }}</p>
          <p><strong>Subtotal:</strong> S/. {{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
        <pv-button @click="removeFromCart(item.postId, item.sizeId)" class="trash-button" aria-label="Eliminar">
          <img src="/images/bin.png" alt="bin-Image" class="bin-container">
        </pv-button>
      </div>

      <!-- Sección de datos de pago -->
      <div class="payment-container">
        <h3>Datos de Pago</h3>
        <label for="card-holder">Titular de la tarjeta:</label>
        <input type="text" id="card-holder" v-model="cardHolder" required/>
        <p v-if="cardHolderError" class="error-message">{{ cardHolderError }}</p>

        <label for="card-number">Número de la tarjeta:</label>
        <input type="text" id="card-number" v-model="cardNumber" maxlength="16" required/>
        <p v-if="cardNumberError" class="error-message">{{ cardNumberError }}</p>

        <label for="expiration-date">Fecha de vencimiento (MM/AA):</label>
        <input type="text" id="expiration-date" v-model="expirationDate" maxlength="5" placeholder="MM/AA" required/>
        <p v-if="expirationDateError" class="error-message">{{ expirationDateError }}</p>

        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="cvv" maxlength="4" required/>
        <p v-if="cvvError" class="error-message">{{ cvvError }}</p>
      </div>

      <!-- Sección de Subtotal y botón de compra -->
      <div class="footer-container">
        <p><strong>Total:</strong> S/. {{ subtotal }}</p>
        <pv-button
            @click="handlePurchase"
            class="button-style"
            :disabled="cart.length === 0">{{ $t('cart.buy') }}
        </pv-button>
      </div>
    </div>

    <!-- Ventana emergente de éxito -->
    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content">
        <h2>¡Pago Exitoso!</h2>
        <p>Tu compra ha sido procesada correctamente.</p>
        <button @click="showSuccessModal = false" class="close-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos de la ventana emergente */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.close-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #4D94FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #3a7ecb;
}

/* Resto del estilo del componente */
.main-container {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.item-container {
  background-color: #ffffff;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image-container {
  height: 100px;
  width: 100px;
  margin-right: 20px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #555;
}

.payment-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
}

.payment-container h3 {
  margin-bottom: 1em;
  text-align: center;
}

.payment-container label {
  display: block;
  margin-bottom: 0.5em;
}

.payment-container input {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.trash-button {
  background-color: transparent;
  cursor: pointer;
  padding: 2px;
  border: none;
}

.bin-container {
  height: 20px;
  width: 20px;
}

.footer-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
}

.button-style {
  padding: 0.8em 2em;
  margin: 0.5em 0;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  background-color: #4D94FF;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease;
}

.button-style:hover {
  background-color: #3a7ecb;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: -10px;
  margin-bottom: 10px;
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
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .payment-container {
    width: 95%;
  }
}
</style>
