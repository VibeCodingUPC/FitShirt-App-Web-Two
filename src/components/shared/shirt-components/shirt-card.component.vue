<script setup>
  const props = defineProps({
    id: {
      type: Number,
      required: true
    },
    imageSrc: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    nameRouter: {
      type: String,
      required: true
    },
    ariaLabelRouter: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <router-link 
    :to="{name: props.nameRouter, params: {id: props.id}}" 
    :aria-label="props.ariaLabelRouter">
    <pv-card class="shirt-card">
      <template #header>
        <img 
        :alt="$props.name + ' image'"
        :aria-label="$props.name + ' image'"
        :src="$props.imageSrc"
        />
      </template>
      <template #content>
        <h1
          :aria-label="$props.name">
          {{ props.name }}

        </h1>
      </template>
    </pv-card>
  </router-link>
</template>

<style scoped>
  .shirt-card {
    width: 180px;
    min-height: 240px;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 1.1em .6em 0 .6em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
  }
  .shirt-card img {
    width: 100%;
    height: 140px;
    object-fit: contain;
    border-radius: 8px;
    transition: transform 0.5s ease;
  }
  .shirt-card h1 {
    text-align: center;
    color: #000;
    font-size: .8em;
    font-weight: 600;
  }
  .shirt-card:hover img {
    transform: scale(1.1)
  }
</style>