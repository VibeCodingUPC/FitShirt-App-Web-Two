<script setup>

</script>

<template>
  <div class="business-dashboard-content">
    <h2>{{$t('dashBusinessman.welcomeBusiness') }}</h2>
    <p>{{$t('dashBusinessman.manageOperations') }}</p>
    <ul>
      <li>{{$t('dashBusinessman.viewProducts') }}</li>
      <li>{{$t('dashBusinessman.manageClients') }}</li>
      <li>{{$t('dashBusinessman.updateProfile') }}</li>
    </ul>
  </div>
</template>

<style scoped>
.business-dashboard-content {
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

.business-dashboard-content h2 {
  color: #3B82F6;
  margin-bottom: 10px;
  font-size: 30px;
}

.business-dashboard-content ul {
  list-style: none;
  padding: 0;
}

.business-dashboard-content li {
  margin: 8px 0;
  color: #4d94ff;
  font-weight: bold;
}
</style>