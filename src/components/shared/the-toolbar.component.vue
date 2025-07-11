<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const visible = ref(false);
const isMobile = ref(false);
const i18nLocale = useI18n();
const userRole = ref(sessionStorage.getItem('userRole'));

const checkMobileView = () => {
  isMobile.value = window.innerWidth <= 768;
};

const changeLanguage = () => {
  i18nLocale.locale.value = i18nLocale.locale.value === 'en' ? 'es' : 'en';
};

const closeMenu = (event) => {
  const sidebar = document.querySelector('.sidebar');
  if (isMobile.value && visible.value && sidebar && !sidebar.contains(event.target) && !event.target.closest('.burger-button')) {
    visible.value = false;
  }
};

const menuOptions = ref([]);

const loadMenuOptions = () => {
  if (userRole.value === 'CLIENT') {
    menuOptions.value = [
      { path: '/profile', icon: '/icons/ProfileIcon.png', label: 'toolbar.profile' },
      { path: '/catalogue', icon: '/icons/ShopIcon.png', label: 'toolbar.catalogue' },
      { path: '/my-design', icon: '/icons/DesignIcon.png', label: 'toolbar.designs' },
      { path: '/cart', icon: '/icons/CartIcon.png', label: 'toolbar.cart' },
      { path: '/shopping-list', icon: '/icons/ShoppingList.png', label: 'toolbar.shopList'},

        //Falta
      {path:'/businessman-list', icon: '/icons/BusinessMan.png',label:'toolbar.businessman'}
    ];
  } else if (userRole.value === 'SELLER') {
    menuOptions.value = [
      { path: '/profile', icon: '/icons/ProfileIcon.png', label: 'toolbar.profile' },
      { path: '/published', icon: '/icons/ShopIcon.png', label: 'toolbar.posts' },
        //Falta
      { path: '/clientslist', icon: '/icons/Clients.png', label: 'toolbar.clients' },
    ];
  }
};

onMounted(() => {
  checkMobileView();
  loadMenuOptions();
  window.addEventListener('resize', checkMobileView);
  window.addEventListener('click', closeMenu);
});
</script>

<template>
  <div class="toolbar-container">
    <pv-button class="button-style burger-button" icon="pi pi-bars" @click="visible = !visible" v-if="isMobile" style="margin: auto;"></pv-button>

    <div :class="['sidebar', { 'mobile-visible': visible }]" v-if="!isMobile || visible">
      <div class="flex flex-column h-full">
        <div class="overflow-y-auto">
          <ul class="list-none p-3">
            <li>
              <ul class="list-none overflow-y-auto">
                <router-link v-for="option in menuOptions" :key="option.path" :to="option.path">
                  <li>
                    <a class="icons-container">
                      <img :src="option.icon" alt="option.label" class="icon-container" />
                      <span>{{ $t(option.label) }}</span>
                    </a>
                  </li>
                </router-link>
              </ul>
            </li>
          </ul>
        </div>
        <div class="footer">
          <pv-button @click="changeLanguage" class="language-button">
            <i class="pi pi-globe"></i>
            {{ i18nLocale.locale.value }}
          </pv-button>
        </div>
        <router-link to="/login" class="logout-button">
          <p>Log out</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  background-color: #ffffff;
  padding: 1rem;
  border-right: 2px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.1s ease;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar.mobile-visible {
  transform: translateX(0);
}

.burger-button {
  display: none;
  position: absolute;
  top: 10px;
  left: 10px;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    position: fixed;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .sidebar.mobile-visible {
    transform: translateX(0);
  }

  .burger-button {
    display: block;
    margin: 0;
  }
}

.button-style {
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icons-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  border-radius: 0.25rem;
  padding: 0.725rem;
  margin: 10px 0;
  width: 100%;
  background-color: #e0e7ff;
  justify-content: flex-start;
}

.icon-container {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 10px;
}

.footer {
  margin-top: 20px;
  text-align: center;
}

.logout-button {
  background-color: #4d94ff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin: 20px auto;
  text-decoration: none;
  font-weight: bold;
  width: 80%;
}

.language-button .pi-globe {
  margin-right: 5px;
}
</style>
