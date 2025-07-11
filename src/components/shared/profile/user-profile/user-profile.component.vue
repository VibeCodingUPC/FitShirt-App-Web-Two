<script setup>
  import { AccountApiService } from '@/services/account-api.service';
import { UserApiService } from '@/services/user-api.service.js';
  import { ref, onBeforeMount } from 'vue';

  const userApiService = new UserApiService();
  const authApiService = new AccountApiService();

  let userInformation = ref({});

  const fetchUserData = async () => {
    userInformation.value = await userApiService.getUserById(authApiService.getUserIdFromToken());
  }

  onBeforeMount(async () => {
    fetchUserData();
  })

</script>

<template>
  <pv-card class="card-container" v-if="userInformation">
    <template #content>
      <div class="form-container">
        <div class="title-text">{{ $t('profile.title') }}</div>
        <div>
          <div class="subtitle-text">{{ $t('profile.name') }}</div>
          <div class="info-container">{{ userInformation.name + " " + userInformation.lastname }}</div>
          <div class="subtitle-text">{{ $t('profile.username') }}</div>
          <div class="info-container">{{ userInformation.username }}</div>
          <div class="subtitle-text">{{ $t('profile.email') }}</div>
          <div class="info-container">{{ userInformation.email }}</div>
          <div class="subtitle-text">{{ $t('profile.numC') }}</div>
          <div class="info-container">{{ userInformation.cellphone }}</div>
          <div class="subtitle-text">{{ $t('profile.birthdate') }}</div>
          <div class="info-container">{{ userInformation.birthDate }}</div>
        </div>
      </div>
      <div class="button-container">
        <router-link to="/edit-profile">
          <pv-button class="button-style">{{ $t('profile.button1') }}</pv-button>
        </router-link>
        <router-link to="/edit-password">
          <pv-button class="button-style">{{ $t('profile.button2') }}</pv-button>
        </router-link>
        <router-link to="/edit-payment-method">
          <pv-button class="button-style">{{ $t('profile.button3') }}</pv-button>
        </router-link>
      </div>
    </template>
  </pv-card>
  <pv-card v-else>
    <p>Loading...</p>
  </pv-card>
</template>
<style scoped>
.card-container{
  background-color: #dadada;
  height: 100%;
  display: flex;
  justify-content: center;
  flex: .95;
  align-self: center;
}
.form-container {
  background-color: #dadada;
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
  padding: .4em;
  width: 300px;
  margin-bottom: 8px;
}
</style>