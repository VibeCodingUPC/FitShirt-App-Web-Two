<script>

import {BusinessmansApiService} from "@/components/businessmans/services/businessmans-api.service.js";
import {ShirtEntity} from "@/components/businessmans/model/Shirt.entity.js";
import ShirtBusinessman from "@/components/businessmans/components/shirt-businessman.component.vue";

export default {
  name: "list-shirt-businessman",
  components: {ShirtBusinessman},
  data(){
    return {
      shirtLists:[],
      shirtApi: new BusinessmansApiService(),
    }
  },
  created (){
    this.shirtApi.getPostByUserId2(this.$route.params.id)
        .then((response) => {
        let dataShirt = response.data;
        dataShirt.forEach(item => {
          this.shirtLists = this.buildShirtFromResponsiveData(dataShirt)
        })
          console.log(this.shirtlists)
          console.log(this.shirtlists[0])
        })
  },
  methods:{
    buildShirtFromResponsiveData(shirts){
      return shirts.map(shirt =>
      new ShirtEntity(
          shirt.id,
          shirt.name,
          shirt.image
      ))
    }
  }
}

</script>

<template>
<div v-for="shirt in this.shirtLists">
  <shirt-businessman :shirt-entity="shirt"></shirt-businessman>
</div>
</template>

<style scoped>

</style>