<script setup>
</script>

<template>
  <pv-card class="card-container">
    <template #content>
      <div class="form-container">
        <div class="title-text">{{ $t('editProfile.titleP') }}</div>
        <div>
          <div class="subtitle-text">{{ $t('editProfile.oldPass') }}</div>
          <pv-inputText class="info-container"></pv-inputText>
          <div class="subtitle-text">{{ $t('editProfile.newPass') }}</div>
          <pv-inputText class="info-container"></pv-inputText>
          <div class="subtitle-text">{{ $t('editProfile.confirmP') }} </div>
          <pv-inputText class="info-container"></pv-inputText>
        </div>
      </div>
      <div class="button-container">
        <router-link to="/profile"><pv-button class="button-style" aria-label="Cancel changes">{{ $t('editProfile.cancelButton') }}</pv-button></router-link>
        <router-link to="/profile"><pv-button class="button-style" aria-label="Confirm changes">{{ $t('editProfile.continueButton') }}</pv-button></router-link>


      </div>
    </template>
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
  height: 20px;
  width: 250px;
  margin-bottom: 8px;
}
</style>