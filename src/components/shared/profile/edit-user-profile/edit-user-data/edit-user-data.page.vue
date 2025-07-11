<script setup>
  import theToolbar from '@/components/shared/the-toolbar.component.vue';
  import editUserData from './edit-user-data.component.vue';
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <edit-user-data/>
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