<script>

export default {
  name: "shirt-businessman",
  props:{
    shirtEntity:{
      type:Object,
    }
  },
  created(){
    console.log(this.shirtEntity);
  }

}
</script>

<template>
  <pv-card class="shirt-card">
    <template #header>
      <img :src="shirtEntity.image" class="shirt-image" />
    </template>
    <template #content>
      <div class="shirt-details">
        <h3 class="shirt-name">{{ shirtEntity.name }}</h3>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.shirt-card {
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.shirt-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.shirt-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  transition: transform 0.5s ease;
}

.shirt-image:hover {
  transform: scale(1.05);
}

.shirt-details {
  padding: 16px;
  text-align: center;
}

.shirt-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px;
}


</style>