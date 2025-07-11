<script setup>
import { environment } from '@/environments/environment';
import { useCart } from '@/hooks/useCart';
import { PurchasesApiService } from '@/services/purchases-api.service';

const { cart, removeFromCart, clearCart } = useCart();
const purchasesService = new PurchasesApiService();

const purchaseCreation = () => {
  let items = cart.map(item => ({
    "postId": item.postId,
    "sizeId": item.sizeId,
    "quantity": item.quantity
  }));

  let purchase = {
    "userId": environment.userId,
    "items": items
  };

  return purchase;
}

const handlePurchase = async () => {
  if (cart.length !== 0) {
    let purchase = purchaseCreation();
    await purchasesService.postPurchase(purchase);
    clearCart();
  }
}

</script>

<template>
  <div class="main-container" aria-describedby="Jersey cart detail">
    <div class="cart-container">
      <div class="header-container">
        <p>Subtotal:&nbsp </p>
        <div class="info-container" ></div>
        <pv-button
            @click="handlePurchase"
            class="button-style"
            :disabled="cart.length===0">{{ $t('cart.buy') }}</pv-button>
        <!-- <router-link to="/catalogue">
        </router-link> -->
      </div>
      <div v-for="(item, i) in cart" :key="i" >
        <div class="item-container">
          <div class="subitem-container">
            <img :src="item.image" alt="Item-Image" class="image-container"/>
            <p>&nbsp{{item.name}}&nbsp</p>
          </div>
          <div class="subitem-container">
            <p>{{ $t('cart.quantity') }}:&nbsp</p>
            <div class="info-container">{{ item.quantity }}</div>
          </div>
          <div class="subitem-container">
            <p>{{ $t('cart.price') }}:&nbsp</p>
            <div class="info-container">S/. {{(item.price).toFixed(2)}}</div>
          </div>
          <div class="subitem-container">
            <p>{{ $t('cart.size') }}:&nbsp</p>
            <div class="info-container">{{item.size}}</div>
          </div>
          <div class="subitem-container">
            <p>Subtotal:&nbsp </p>
            <div class="info-container">S/. {{(item.price*item.quantity).toFixed(2)}}</div>
          </div>
          <div>
            <pv-button
                @click="removeFromCart(item.postId, item.sizeId)"
                class="trash-button" >
              <img src="/images/bin.png" alt="bin-Image" class="bin-container">
            </pv-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container{
  background-color: #dadada;
  padding: 20px;
  flex: .95;
}
.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.trash-button{
  background-color: rgba(255, 255, 255, 0);
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
.bin-container{
  height: 20px;
}
.header-container{
  padding: 20px;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-container{
  background-color: #cacaca;
  padding: 20px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 5px;
}
.image-container{
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
.editableinfo-container {
  border-radius: 4px;
  background-color: #ffffff;
  height: 20px;
  width: 100px;
  padding-left: 20px;
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
</style>
