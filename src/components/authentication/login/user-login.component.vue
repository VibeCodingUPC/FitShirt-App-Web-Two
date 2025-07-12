<script setup>
import {useI18n} from "vue-i18n";
import { ref } from 'vue';
import { AccountApiService } from "@/services/account-api.service";
import { UserApiService } from "@/services/user-api.service";
import router from "@/routes";

let userLogin = ref({
  username: "",
  password: ""
})

let loginError = ref("");

const validateLogin = () => {

  if (userLogin.value.username.length < 6) {
    loginError.value="Username must be between 6 and 16 characters";
    return false;
  }

  if (userLogin.value.password.length < 8) {
    loginError.value="Password must be between 8 and 32 characters";
    return false;
  }

  return true;
}

const i18nLocale = useI18n();
const changeLanguage = () => {
  i18nLocale.locale.value = i18nLocale.locale.value === 'en' ? 'es' : 'en';
}

const accountService = new AccountApiService();

const handleLogin = async () => {
  try {
    let isValidLoginRequest = validateLogin();

    if (isValidLoginRequest) {
      let userLoginRequest = {
        "username": userLogin.value.username,
        "password": userLogin.value.password
      }

      let decodedToken = await accountService.login(userLoginRequest);
      let userRole = decodedToken.Role;

      sessionStorage.setItem('userRole', decodedToken.Role);
      sessionStorage.setItem('userIdF', decodedToken.sid);

      if (userRole === 'CLIENT') {
        router.push('/client-dashboard');
      } else if (userRole === 'SELLER') {
        router.push('/businessman-dashboard');
      } else {
        loginError.value = "Role not recognized";
      }
    }

  } catch (error) {
    // Verifica si el error contiene un mensaje o un código de respuesta de la API
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        loginError.value = "The username or password provided is incorrect.";
      } else if (statusCode === 404) {
        loginError.value = "Username was not found";
      } else if (statusCode === 500) {
        loginError.value = "Server error. Please try again later.";
      } else {
        loginError.value = "An unknown error occurred. Please try again.";
      }
    } else {
      // Error general en caso de que no haya respuesta de la API
      loginError.value = "Network error. Please check your connection.";
    }

    // Limpia los campos de entrada después de un error
    userLogin.value.password = "";
  }
};


</script>

<template>

  <div class="card-container">
    <div>
      <img src="/images/LogoFitShirt.png" alt="profile-Image" class="img-container">
      <div class="description-container">
        <p class="app-description"> {{ $t('login.description') }}</p>
      </div>
    </div>
    <div class="login-card">
      <p class="title-container">{{ $t('login.title') }}</p>
      <p class="cwhite">{{ $t('login.user') }}</p>
      <pv-inputText class="mb10" type="text" v-model="userLogin.username" aria-label="Enter a username"/>
      <p class="cwhite">{{ $t('login.password') }}</p>
      <pv-inputText class="mb10" type="password" v-model="userLogin.password" aria-label="Enter a password"/>
      <pv-button
          :label="$t('login.button')"
          severity="info"
          class="button-container"
          @click="handleLogin"/>
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <p class="cwhite mb100 tac">{{ $t('login.forgotPassword') }}</p>
      <hr class="line-container"/>
      <p class="cwhite mb10 tac register">
        <router-link to="/register">
        {{ $t('login.newmsg') }}
        <br>
          {{ $t('login.signup') }}
        </router-link>
      </p>
      <div class="changelanguage">
        <pv-button @click="changeLanguage" class="language-button">
          <i class="pi pi-globe"></i>
          {{ i18nLocale.locale.value }}
        </pv-button>
      </div>

    </div>
  </div>

</template>

<style scoped>
.line-container {
  margin: 0 1rem 1rem 1rem;
  border: solid white 1px;
}

.card-container {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 2em;
}

.img-container {
  width: 400px;
  display: flex;
  justify-content: center;
  margin-right: 20px;
}

.description-container {
  width: 400px;
  display: flex;
  justify-content: center;
}

.login-card {
  background-color: #333333;
  border-radius: 25px;
  padding: 3em;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  margin: 0;
}

.app-description {
  text-align: justify;
  font-family: Roboto, sans-serif;
}

.title-container {
  text-align: center;
  font-size: 40px;
  font-family: Roboto, sans-serif;
  font-weight: bolder;
  margin-bottom: 20px;
  color: white;
}

.button-container {
  width: 100%;
  background-color: #4d94ff;
  color: white;
  margin-bottom: 10px;
  padding: 10px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.cwhite {
  color: white;
}

.mb10 {
  margin-bottom: 10px;
}

.mb100 {
  margin-bottom: 1.2em;
}

.mb50 {
  margin-bottom: 50px;
}

.tac {
  text-align: center;
}

.register:hover {
  text-decoration: underline;
}

.changelanguage {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.language-button {
  background-color: #4d94ff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.language-button .pi-globe {
  margin-right: 5px;
}

@media (max-width: 900px) {
  .app-description {
    display: none;
  }

  .img-container {
    display: none;
  }

  .description-container {
    display: none;
  }
}

@media (min-width: 600px) {
  .login-card {
    padding: 2em;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    margin: 0;
  }

  .img-container {
    width: 400px;
  }

  .description-container {
    width: 400px;
  }

  .title-container {
    font-size: 24px;
  }

  .button-container {
    padding: 10px;
  }

  .changelanguage {
    margin-top: 10px;
  }
}

@media (min-width: 901px) {
  .card-container {
    padding: 3em;
  }

  .img-container,
  .description-container {
    margin: 0 90px;
  }

  .title-container {
    font-size: 40px;
  }

  .login-card {
    padding: 3.5em;
    margin: 0;
  }
}
</style>