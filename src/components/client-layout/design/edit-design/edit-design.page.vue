<script setup>
import TheToolbar from "@/components/shared/the-toolbar.component.vue";
import EditDesign from "./edit-design.component.vue";
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <edit-design/>
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