<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const url = ref("");

    onMounted(() => {
      url.value = window.location.href;
    });

    return { url };
  }
};
</script>

<template>
  <div class="container" aria-label="Error window if user types a non-existent url">
    <h1>Error 404</h1>
    <h2>La dirección solicitada, {{ url }}, no fue encontrada</h2>
    <router-link to="/catalogue" tag="button" class="router-button">
      Volver al inicio
    </router-link>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: .8em;
  padding: 1.6em;
}
.container h1 {
  font-size: 2.4em;
  font-weight: 600;
}
.container h2 {
  font-size: 1.4em;
  font-weight: 400;
}
.container .router-button {
  padding: 1em .6em;
  border-radius: 10px;
  cursor: pointer;
  background-color: #333333;
  color: #dedede;
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
}
</style>