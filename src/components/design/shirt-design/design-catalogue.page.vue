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
  width: 85vw;
  max-width: 1050px;
  min-height: 100vh;
  padding: .6em 1.2em;
  margin: auto;
  background-color: #f3f3f3;
}
@media (max-width: 600px) {
  .main {
    width: 100vw;
  }
}
</style>