<script>

export default {
  name: "item-businessman",

  props:{
    businessEntity:{
      type: Object,
    }
  }
}
</script>

<template>
<pv-card >
  <template #header>

  </template>
  <template #title>
    {{businessEntity.name}} {{businessEntity.lastName}}
  </template>
  <template #subtitle>
  {{businessEntity.userName}}
  </template>
  <template #content>
    E-mail: {{businessEntity.email}}<br>
    Celular: {{businessEntity.cellphone}}<br>
  </template>

</pv-card>
</template>

<style scoped>

</style>