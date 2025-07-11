<script setup>
  import theToolbar from '@/components/shared/the-toolbar.component.vue';
import EditShirt from "./edit-shirt.component.vue";
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <edit-shirt/>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-around;
  margin: auto;
}
@media (max-width: 600px) {
  .main {
    width: 100vw;
  }
}
</style>