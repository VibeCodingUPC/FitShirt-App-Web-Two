<script setup>
  import theToolbar from '../../shared/the-toolbar.component.vue';
  import shirtDescription from './shirt-description.component.vue';
</script>

<template>
  <main class="main">
    <the-toolbar/>
    <shirt-description/>
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