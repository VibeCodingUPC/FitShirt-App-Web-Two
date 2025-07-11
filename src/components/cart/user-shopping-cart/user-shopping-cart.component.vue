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
}

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
}

const handlePurchase = async () => {
  if (cart.length === 0) return;

  if (validateInputs()) {
    let purchase = purchaseCreation();
    await purchasesService.postPurchase(purchase);
    clearCart();
    alert("¡Pago exitoso!");
  }
}
</script>

<template>
  <div class="main-container" aria-describedby="Jersey cart detail">
    <div class="cart-container">
      <!-- Items del carrito -->
      <div v-for="(item, i) in cart" :key="i" class="item-container">
        <div class="subitem-container">
          <img :src="item.image" alt="Item-Image" class="image-container"/>
          <p>&nbsp{{ item.name }}&nbsp</p>
          <p>{{ $t('cart.quantity') }}: {{ item.quantity }}</p>
          <p>{{ $t('cart.price') }}: S/. {{ item.price.toFixed(2) }}</p>
          <p>{{ $t('cart.size') }}: {{ item.size }}</p>
          <p>Subtotal: S/. {{ (item.price * item.quantity).toFixed(2) }}</p>
          <pv-button @click="removeFromCart(item.postId, item.sizeId)" class="trash-button">
            <img src="/images/bin.png" alt="bin-Image" class="bin-container">
          </pv-button>
        </div>
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
        <p>Total: S/. {{ subtotal }}</p>
        <pv-button
            @click="handlePurchase"
            class="button-style"
            :disabled="cart.length === 0">{{ $t('cart.buy') }}
        </pv-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: -10px;
  margin-bottom: 10px;
}
.main-container {
  background-color: #dadada;
  padding: 20px;
  flex: .95;
}

.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.payment-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}

.payment-container h3 {
  margin-bottom: 1em;
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
  background-color: rgba(255, 255, 255, 0);
}

.item-container {
  background-color: #cacaca;
  padding: 20px;
  margin: 5px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}

.image-container {
  height: 140px;
  width: 150px;
  margin: 5px;
}

.info-container {
  border-radius: 4px;
  background-color: #ffffff;
  height: 20px;
  width: 100px;
  padding-left: 20px;
  padding-top: 2px;
  margin-right: 10px;
}

.button-style {
  padding: .6em 2em;
  margin: .5em 0;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  background-color: #4D94FF;
  color: #E5E5E5;
}

.footer-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
}
</style>
