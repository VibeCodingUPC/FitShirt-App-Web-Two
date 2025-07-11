<script setup>
import { ref } from "vue";
import {useI18n} from "vue-i18n";

const visible = ref(false);
const i18nLocale = useI18n();
const changeLanguage = () => {
  if (i18nLocale.locale.value == 'en') {
    i18nLocale.locale.value='es'
  }
  else {
    i18nLocale.locale.value='en'
  }
}
</script>

<template>
  <div class="sidebar-container">
  <pv-button class="button-style" icon="pi pi-bars" @click="visible = true"></pv-button>
    <pv-sidebar v-model:visible="visible">
      <template #container>
        <div class="flex flex-column h-full">
          <div class="overflow-y-auto">
            <ul class="list-none p-3 ">
              <li>
                <ul class="list-none overflow-y-auto">
                  <router-link to="/profile">
                    <li>
                      <a class="icons-container">
                        <img src="/icons/ProfileIcon.png" alt="profile-Image" class="icon-container">
                        <span >{{ $t('toolbar.profile') }}</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/catalogue">
                    <li>
                      <a class="icons-container">
                        <img src="/icons/ShopIcon.png" alt="shop-Image" class="icon-container">
                        <span >{{ $t('toolbar.catalogue') }}</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/published">
                    <li>
                      <a class="icons-container">
                        <img src="/icons/ShopIcon.png" alt="shop-Image" class="icon-container">
                        <span >{{ $t('toolbar.posts') }}</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/my-design">
                    <li>
                      <a class="icons-container">
                        <img src="/icons/DesignIcon.png" alt="shop-Image" class="icon-container">
                        <span >{{ $t('toolbar.designs') }}</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/cart">
                    <li>
                      <a class="icons-container">
                        <img src="/icons/CartIcon.png" alt="shop-Image" class="icon-container">
                        <span >{{ $t('toolbar.cart') }}</span>
                      </a>
                    </li>
                  </router-link>
                  <router-link to="/premium">
                    <li>
                      <a class="icons-container">
                        <img src="/icons/PremiumIcon.png" alt="shop-Image" class="icon-container">
                        <span >{{ $t('toolbar.premium') }}</span>
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
            <p>LogOut</p>
          </router-link>
        </div>
      </template>
    </pv-sidebar>
  </div>
</template>

<style scoped>
.sidebar-container {
  position: relative;
  flex: .05;
}
.button-style {
  width: 36px;
  height: 36px;
  padding: .8em;
  border-radius: 12px;
  background-color: #cacaca;
  cursor: pointer;
}
.icons-container{
  display:flex;
  align-items: center;
  cursor: pointer;
  background-color: rgba(37, 99, 235, 0.26);
  overflow: hidden;
  font-weight: 600;
  border-radius: 0.25rem;
  padding: 0.725rem;
  margin: 10px;
}
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.h-full {
}
.icon-container{
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
}
.overflow-y-auto {
  overflow-y: auto;
}
.list-none {
  list-style-type: none;
}

.p-3 {
  padding: 0.75rem;
}

.footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.logout-button {
  background-color: #4d94ff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 28em;
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Ensure proper size */
  font-weight: bold;
}
.language-button .pi-globe {
  margin-right: 5px;
}

</style>