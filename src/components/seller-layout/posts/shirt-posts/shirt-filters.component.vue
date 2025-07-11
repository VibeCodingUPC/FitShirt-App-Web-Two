<script setup>
</script>

<template>
  <div class="filter-container" aria-describedby="Bottom publish">
    <form class="filter-form">
      <router-link to ="/publish">
      <button class="form-button" aria-label="Publish a post">
        {{ $t('posts.post') }}
      </button>
      </router-link>
    </form>
  </div>
</template>

<style scoped>
.filter-container {
  padding: .4em;
}
.filter-container .filter-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.filter-container .filter-form .input-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: .4em;
}
.filter-container .filter-form .input-container label {
  margin-right: .4em;
}
.filter-container .filter-form .input-container select {
  align-items: center;
  width: 140px;
  font-size: .8rem;
  padding: .3em;
  border: solid black 1px;
  border-radius: 6px;
}
.filter-container .filter-form .form-button {
  background-color: #4D94FF;
  padding: .8em 2.8em;
  border-radius: 8px;
  color: #E5E5E5;
  font-size: .8em;
  font-weight: 600;
  cursor: pointer;
}
</style>
