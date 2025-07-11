<script setup>
  import theToolbar from '@/components/shared/the-toolbar.component.vue';

import CreateDesign from "./create-design.component.vue";
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <create-design/>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  margin: auto;
}
@media (max-width: 600px) {
  .main {
    width: 100vw;
  }
}
</style>