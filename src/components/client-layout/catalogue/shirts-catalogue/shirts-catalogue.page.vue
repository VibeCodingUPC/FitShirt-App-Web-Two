<script setup>
  import theToolbar from '@/components/shared/the-toolbar.component.vue';
  import shirtsCatalogue from './shirts-catalogue.component.vue';
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <shirts-catalogue/>
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