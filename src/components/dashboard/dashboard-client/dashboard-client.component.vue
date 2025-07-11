<script setup>

</script>

<template>
  <div class="client-dashboard-content">
    <h2>{{ $t('dashClient.welcomeClient') }}</h2>
    <p>{{$t('dashClient.personalizedDashboard') }}</p>
    <ul>
      <li>{{ $t('dashClient.checkProfile') }}</li>
      <li>{{ $t('dashClient.browseCatalogue') }}</li>
      <li>{{ $t('dashClient.manageDesigns') }}</li>
      <li>{{ $t('dashClient.viewCart') }}</li>
    </ul>
  </div>

</template>

<style scoped>
.client-dashboard-content {
  padding: 30px;
  background-color: #e0e7ff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  flex: .95;
  align-self: center;
  flex-direction: column;
}

.client-dashboard-content h2 {
  color: #3B82F6;
  margin-bottom: 10px;
  font-size: 30px;
}

.client-dashboard-content ul {
  list-style: none;
  padding: 0;
}

.client-dashboard-content li {
  margin: 8px 0;
  color: #4d94ff;
  font-weight: bold;
}
</style>
