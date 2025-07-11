<script>
export default {
  name: "item-businessman",
  props: {
    businessEntity: {
      type: Object,
    },
  },
};
</script>

<template>
  <pv-card>
    <template #header>
    </template>

    <template #title>
      {{ businessEntity.name }} {{ businessEntity.lastName }}
    </template>

    <template #subtitle>
      {{ businessEntity.userName }}
      <div style="width: fit-content; margin-left: auto;">
        <router-link :to="`/businessman/${businessEntity.id}`">
          <pv-button
              label="INFO"
              class="w-full"
              style="background-color: black; border-color: black"
          />
        </router-link>
        <!-- New WhatsApp Button -->
        <a :href="`https://wa.me/${businessEntity.cellphone}`" target="_blank">
          <pv-button
              icon="pi pi-whatsapp"
              class="w-full"
              style="background-color: green; border-color: green; margin-top: 5px;"
          />
        </a>
      </div>
    </template>

    <template #content>
      E-mail: {{ businessEntity.email }}<br/>
      Celular: {{ businessEntity.cellphone }}<br/>
    </template>
  </pv-card>
</template>

<style scoped>
</style>
