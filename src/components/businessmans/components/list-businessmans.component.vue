<script >
import ItemBusinessman from "@/components/businessmans/components/item-businessman.component.vue";
import {BusinessmansApiService} from "@/components/businessmans/services/businessmans-api.service.js";
import {businessMan} from "@/components/businessmans/model/Businessman.entity.js";

export default{
  name: "list-businessmans",
  components: {ItemBusinessman},
  data(){
    return{
      businessmans:[],
      dataApi: new BusinessmansApiService(),
    }
  },
  created() {
    this.dataApi.getAllBusinessmansApiService()
        .then(response => {
          let dataMans = response;
          dataMans.forEach(item => {
            this.businessmans = this.buildBusinessMansFromResponsiveData(dataMans);
          })

          console.log(this.businessmans);
        })
  },
  methods:{
    buildBusinessMansFromResponsiveData(sellers){
      return sellers.map(seller =>
        new businessMan(
            seller.id,
            seller.name,
            seller.lastname,
            seller.username,
            seller.email,
            seller.cellphone,
            seller.role
        )
      )
    }
  }


}
</script>

<template>
  <div v-for="man in this.businessmans">
  <item-businessman :business-entity="man"></item-businessman>
  </div>
</template>

<style scoped>

</style>