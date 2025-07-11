<template>
    <div class="client-description-container" v-if="clientInformation">
      <div class="client-details">
        <h2 class="client-name">{{ clientInformation.name }}</h2>
        <p><b>Categoría:</b> {{ clientInformation.category }}</p>
        <p><b>Talla:</b> {{ clientInformation.size }}</p>
        <p><b>Color:</b> {{ clientInformation.color }}</p>
        <p><b>Material:</b> {{ clientInformation.material }}</p>
        <p><b>Fecha solicitada:</b> {{ clientInformation.requestDate }}</p>
    
        <!-- Botón para contactar por WhatsApp -->
        <a :href="whatsappLink" target="_blank" class="contact-whatsapp">
          Contactar por WhatsApp
        </a>
      </div>
      
      <div class="client-image">
        <img :src="clientInformation.image" :alt="`Imagen de ${clientInformation.name}`" />
      </div>
    </div>
    <p v-else>Cargando...</p>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: "ClientDescription",
    setup() {
      const route = useRoute();
      const clientInformation = ref(null);
  
      // JSON de prueba de clientes
      const clientsData = [
        {
          id: 1,
          name: "Cliente 1",
          size: "M",
          color: "Azul",
          material: "Algodón",
          image: "/images/shirts/camiseta_7.png",
          requestDate: "2023-11-01",
          category: "Football",
          phoneNumber: "+51987654321" // Número de celular de prueba
        },
        {
          id: 2,
          name: "Cliente 2",
          size: "L",
          color: "Rojo",
          material: "Poliéster",
          image: "/images/shirts/camiseta_2.png",
          requestDate: "2023-10-15",
          category: "Volley",
          phoneNumber: "+51912345678" // Número de celular de prueba
        },
        {
          id: 3,
          name: "Cliente 3",
          size: "S",
          color: "Verde",
          material: "Nylon",
          image: "/images/shirts/camiseta_3.png",
          requestDate: "2023-09-25",
          category: "Basketball",
          phoneNumber: "+51923456789" // Número de celular de prueba
        },
        // Añadir más datos de clientes según sea necesario
      ];
  
      // Simulación de llamada a la "API" para obtener los datos del cliente por ID
      const fetchClientInformation = (id) => {
        const client = clientsData.find(c => c.id === parseInt(id));
        clientInformation.value = client || null;
      };
  
      onMounted(() => {
        fetchClientInformation(route.params.id);
      });
  
      // Enlace dinámico de WhatsApp con un mensaje predefinido usando el número de teléfono del cliente
      const whatsappLink = computed(() => {
        if (clientInformation.value) {
          return `https://wa.me/${clientInformation.value.phoneNumber}?text=Hola, estoy interesado en el pedido de ${clientInformation.value.name}.`;
        }
        return "#";
      });
  
      return {
        clientInformation,
        whatsappLink,
      };
    },
  };
  </script>
  
  <style scoped>
  .client-description-container {
    display: flex;
    flex-direction: row;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
  }
  
  .client-details {
    flex: 1;
    padding-right: 20px;
  }
  
  .client-name {
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .client-details p {
    margin: 0.4em 0;
    font-size: 1em;
    color: #555;
  }
  
  .contact-whatsapp {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #25d366;
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    text-align: center;
  }
  
  .contact-whatsapp:hover {
    background-color: #20b858;
  }
  
  .client-image {
    width: 300px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .client-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  </style>
  