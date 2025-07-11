<script setup>
import TheToolbar from "@/components/shared/the-toolbar.component.vue";
import CreateDesign from "@/components/design/create-design/create-design.component.vue";
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
  width: 85vw;
  min-height: 100vh;
  max-width: 1050px;
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