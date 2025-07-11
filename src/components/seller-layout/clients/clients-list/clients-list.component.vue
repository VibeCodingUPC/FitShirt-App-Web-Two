<template>
    <div class="clients-container">
      <h1 class="title">PEDIDOS</h1> <!-- Título de la sección -->
      <div class="clients-list">
        <div 
          class="client-card" 
          v-for="client in clients" 
          :key="client.id"
          @click="goToClient(client.id)"
        >
          <div class="status-tag" :class="{ active: client.isActive }">
            {{ client.isActive ? 'Activo' : 'Finalizado' }}
          </div>
          <img :src="client.shirtImage" alt="Camiseta de cliente" class="client-image" />
          <p class="client-name">{{ client.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: "ClientsList",
    setup() {
      const clients = ref([
        { id: 1, name: "Cliente 1", shirtImage: "/images/shirts/camiseta_7.png", isActive: true },
        { id: 2, name: "Cliente 2", shirtImage: "/images/shirts/camiseta_2.png", isActive: false },
        { id: 3, name: "Cliente 3", shirtImage: "/images/shirts/camiseta_3.png", isActive: true },
        // Añadir más clientes según sea necesario
      ]);
  
      const goToClient = (id) => {
        window.location.href = `/clients/${id}`;
      };
  
      return {
        clients,
        goToClient
      };
    }
  };
  </script>
  
  <style scoped>
  .clients-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    flex: .95;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
    margin-top: 15px;
  }
  
  .clients-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  
  .client-card {
    width: 200px;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .client-card:hover {
    transform: scale(1.05);
  }
  
  .status-tag {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    color: white;
  }
  
  .status-tag.active {
    background-color: #4caf50; /* Verde para activo */
  }
  
  .status-tag:not(.active) {
    background-color: #f44336; /* Rojo para finalizado */
  }
  
  .client-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .client-name {
    margin-top: 12px;
    font-weight: bold;
  }
  </style>
  