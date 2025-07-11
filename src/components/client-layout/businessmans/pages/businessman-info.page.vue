<script setup>

import TheToolbar from "@/components/shared/the-toolbar.component.vue";
import InfoBusinessman from "@/components/client-layout/businessmans/components/info-businessman.component.vue";
import ListShirtBusinessman from "@/components/client-layout/businessmans/components/list-shirt-businessman.component.vue";



</script>

<template>
  <main class="main">
    <the-toolbar/>
    <div>
      <info-businessman></info-businessman>
    </div>

    <div class="scroll-panel">
      <div class="content">
        <div id="list">
          <list-shirt-businessman></list-shirt-businessman>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  margin: auto;
}
@media (max-width: 600px) {
  .main {
    width: 100vw;
  }
}
#list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
::-webkit-scrollbar-thumb {

  background-color: #00FF01;
  color: #00FF01;
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}

.scroll-panel {

  width: fit-content;
  height: 950px;
  overflow-y: auto; /* Activa el scroll vertical */
  border-left: 3px solid #000;
  padding: 100px;
}


/* Estilos del Scrollbar */
.scroll-panel::-webkit-scrollbar {
  width: 12px; /* Ancho del scrollbar */
}

.scroll-panel::-webkit-scrollbar-thumb {
  background: #7e7c7c;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.scroll-panel::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 2px solid #dadada;
}

.scroll-panel::-webkit-scrollbar-thumb:hover {
  background-color: black; /* Color del thumb cuando está en hover */
}

.content {
  height: 1000px; /* Asegura que el contenido sea lo suficientemente grande para que aparezca el scroll */
}
</style>