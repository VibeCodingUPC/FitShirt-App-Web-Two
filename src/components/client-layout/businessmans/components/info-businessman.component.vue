<script>
import { BusinessmansApiService } from "@/components/client-layout/businessmans/services/businessmans-api.service.js";
import {MessagesApiService} from "@/services/messages-api.service.js";

export default {
  name: "info-businessman",
  data() {
    return {
      businessman: null, // Cambiar a null para diferenciar entre cargado o vacío
      isLoading: true, // Estado para controlar el loader
      dataApi: new BusinessmansApiService(),
      messagesApi: new MessagesApiService(),
      messages: [],
      newMessage: "",
      userId: parseInt(sessionStorage.getItem("userIdF")),
    };
  },
  methods: {
    async fetchMessages() {
      this.messages = await this.messagesApi.getConversation(this.userId, this.businessman.id);
      console.log("Mensajes obtenidos:", this.messages);
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      await this.messagesApi.sendMessage(this.newMessage, this.userId, this.businessman.id);
      this.messages.push({
        id: Date.now(),
        content: this.newMessage,
        senderId: this.userId,
        receiverId: this.businessman.id,
        sentAt: new Date().toISOString(),
      });
      this.newMessage = "";
      this.$nextTick(() => {
        this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight;
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  created() {
    this.dataApi
      .getBusinessmansByIdApiService(this.$route.params.id)
      .then((response) => {
        this.businessman = response;
        this.fetchMessages();
      })
      .finally(() => {
        this.isLoading = false; // Ocultar el loader al finalizar la carga
      });
  },
};
</script>

<template>
  <div>
    <!-- Mostrar loader mientras se cargan los datos -->
    <div v-if="isLoading" class="loader-container">
      <img src="/images/loanding.webp" alt="loader" class="loader" />
    </div>

    <!-- Mostrar la tarjeta del businessman una vez cargados los datos -->
    <pv-card v-else class="businessman-card">
      <template #header>
        <!-- Aquí podrías agregar una imagen si es necesario -->
      </template>
      <template #title>
        <h3 class="businessman-name">{{ businessman.name }} {{ businessman.lastname }}</h3>
      </template>
      <template #subtitle>
        <p class="businessman-username">@{{ businessman.username }}</p>
      </template>
      <template #content>
        <div class="contact-info">
          <p><strong>E-mail:</strong> {{ businessman.email }}</p>
          <p><strong>Celular:</strong> {{ businessman.cellphone }}</p>
        </div>
      </template>
    </pv-card>
    <div class="messaging-container">
      <h4 class="message-title">Mensajes</h4>

      <div class="message-box" ref="messageBox">
        <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['message', msg.senderId === userId ? 'sent' : 'received']"
        >
          <p class="message-content">{{ msg.content }}</p>
          <span class="message-time">{{ formatDate(msg.sentAt) }}</span>
        </div>
      </div>

      <div class="message-input-container">
        <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Escribe un mensaje..."
            class="message-input"
        />
        <button @click="sendMessage" class="send-button">Enviar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Ajustar según el diseño */
}

.loader {
  width: 16vw;
  height: 20vh;
}

.businessman-card {
  width: 25rem;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
}

.businessman-name {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  padding: 8px 0;
}

.businessman-username {
  font-size: 1rem;
  color: #666;
  margin: 0;
  padding: 4px 0;
  font-style: italic;
}

.contact-info {
  font-size: 0.95rem;
  color: #555;
  padding-top: 8px;
}

.contact-info p {
  margin: 4px 0;
}

.messaging-container {
  margin-top: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fafafa;
}

.message-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #444;
}

.message-box {
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  border-radius: 6px;
}

.message {
  margin-bottom: 0.8rem;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  max-width: 75%;
  word-wrap: break-word;
  position: relative;
}

.sent {
  background-color: #daf1ff;
  align-self: flex-end;
  margin-left: auto;
}

.received {
  background-color: #f1f1f1;
  align-self: flex-start;
  margin-right: auto;
}

.message-time {
  font-size: 0.7rem;
  color: #666;
  margin-top: 0.3rem;
  display: block;
  text-align: right;
}

.message-input-container {
  display: flex;
  gap: 0.5rem;
}

.message-input {
  flex: 1;
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.send-button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
.send-button:hover {
  background-color: #0056b3;
}

</style>
