<script setup>
import theToolbar from '../../shared/the-toolbar.component.vue';
import ShirtDesigns from "@/components/design/shirt-design/shirt-designs.component.vue";
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <shirt-designs/>
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