<script setup>

</script>

<template>
  <div class="premium-container">
    <h1>{{ $t('premium.title') }}</h1>
    <div class="premium-content">
      <div class="plan free">
        <h2>{{ $t('premium.free') }}</h2>
        <ul>
          <li>{{ $t('premium.freedesc1') }}</li>
          <li>{{ $t('premium.freedesc2') }}</li>
        </ul>
      </div>
      <div class="plan premium">
        <h2>{{ $t('premium.premium') }}</h2>
        <ul>
          <li>{{ $t('premium.premiumdesc1') }}</li>
          <li>{{ $t('premium.premiumdesc2') }}</li>
          <li>{{ $t('premium.premiumdesc3') }}</li>
          <li>{{ $t('premium.premiumdesc4') }}</li>
        </ul>
        <p class="price">{{ $t('premium.price') }}</p>
        <router-link to="/premium-confirm" tag="button" class="router-button">{{ $t('premium.buy') }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.premium-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

.router-button {
  padding: 1em .6em;
  border-radius: 10px;
  cursor: pointer;
  background-color: #333333;
  color: #dedede;
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
}

.premium-container h1{
  font-weight: bold;
}

.premium-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.plan {
  width: 45%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.plan h2 {
  margin-bottom: 10px;
  font-weight: bold;
}

.plan ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

.plan ul li {
  margin-bottom: 10px;
}

.plan.premium {
  background-color: #f0f8ff;
}

.plan .price {
  font-size: 1.5em;
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>