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
<pv-card style="width: 25rem">
  <template #header>

  </template>
  <template #title>
    {{businessEntity.name}} {{businessEntity.lastName}}
  </template>
  <template #subtitle>
  {{businessEntity.userName}}
    <div style="width: fit-content; margin-left: auto; ">
      <router-link :to="`/businessman/${businessEntity.id}`">
        <pv-button  label="INFO" class="w-full" style="background-color: black; border-color: black"/>
      </router-link>
    </div>
  </template>
  <template #content>
    E-mail: {{businessEntity.email}}<br><br>
    Celular: {{businessEntity.cellphone}}<br>
  </template>

</pv-card>
</template>

<style scoped>

</style>