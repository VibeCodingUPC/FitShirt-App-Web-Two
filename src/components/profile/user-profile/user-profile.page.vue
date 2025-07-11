<script setup>
  import theToolbar from '@/components/shared/the-toolbar.component.vue';
  import userProfile from './user-profile.component.vue';
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <user-profile/>
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