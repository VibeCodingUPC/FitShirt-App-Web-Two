<script setup>
import theToolbar from '../../shared/the-toolbar.component.vue';
import PublishedShirts from "@/components/posts/shirt-posts/published-shirts.component.vue";
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <published-shirts/>
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