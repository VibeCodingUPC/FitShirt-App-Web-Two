<script setup>
import theToolbar from '../../shared/the-toolbar.component.vue';
import PublishShirt from "@/components/posts/publish-post/publish-shirt.component.vue";
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <publish-shirt/>
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