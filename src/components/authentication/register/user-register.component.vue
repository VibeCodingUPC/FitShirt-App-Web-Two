<script setup>
import { onMounted, computed, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { AccountApiService } from "@/services/account-api.service";
import router from "@/routes";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

onMounted(() => {
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
});

let userRegistration = ref({
  "name": "",
  "lastname": "",
  "username": "",
  "password": "",
  "confirmPassword": "",
  "email": "",
  "cellphone": "",
  "userRole": "",
  "captchaResponse": ""
});

const { t } = useI18n();
let options = computed(() => [
  { label: t('register.userClient'), value: 'CLIENT' },
  { label: t('register.userSeller'), value: 'SELLER' }
]);

const accountService = new AccountApiService();
//let captchaResponse = ref("");
let registrationError = ref("");

const validateRegistration = () => {
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (userRegistration.value.username.length < 6) {
    registrationError.value = "Username must be at least 6 characters long";
    return false;
  }
  if (userRegistration.value.password.length < 8) {
    registrationError.value = "Password must be at least 8 characters long";
    return false;
  }
  if (userRegistration.value.password !== userRegistration.value.confirmPassword) {
    registrationError.value = "Passwords do not match";
    return false;
  }
  if (!reEmail.test(userRegistration.value.email)) {
    registrationError.value = "Invalid email format";
    return false;
  }
  if (userRegistration.value.cellphone.length !== 9) {
    registrationError.value = "Cellphone must be 9 digits long";
    return false;
  }
  if (!userRegistration.value.captchaResponse) {
    registrationError.value = "Please complete the CAPTCHA";
    return false;
  }
  registrationError.value = "";
  return true;
};

const i18nLocale = useI18n();
const changeLanguage = () => {
  i18nLocale.locale.value = i18nLocale.locale.value === 'en' ? 'es' : 'en';
}

const onCaptchaVerified = (response) => {
  captchaResponse.value = response;
  console.log(captchaResponse.value);
};

const handleRegistration = async () => {
  try {
    // Ejecutar reCAPTCHA v3
    const captchaToken = await grecaptcha.execute(SITE_KEY, { action: 'submit' });
    userRegistration.value.captchaResponse = captchaToken;

    let isCorrectRegistrationRequest = validateRegistration();
    if (!isCorrectRegistrationRequest) return;

    const response = await accountService.register(userRegistration.value);
    await router.push('/login');

  } catch (error) {
    if (error.response && error.response.status === 409) {
      registrationError.value = "Username, email or phone number is already registered";
    } else {
      registrationError.value = "Error processing the registration. Please try again.";
      console.error("Error during registration:", error);
    }
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
    <div class="register-card">
      <p class="title-container">{{ $t('register.title') }}</p>
      <p class="cwhite">{{ $t('register.name') }}</p>
      <pv-inputText class="mb10" type="text" v-model="userRegistration.name" aria-label="Enter a username" />

      <p class="cwhite">{{ $t('register.lastname') }}</p>
      <pv-inputText class="mb10" type="text" v-model="userRegistration.lastname" aria-label="Enter a username" />

      <p class="cwhite">{{ $t('register.user') }}</p>
      <pv-inputText class="mb10" type="text" v-model="userRegistration.username" aria-label="Enter a username" />

      <p class="cwhite">{{ $t('register.password') }}</p>
      <pv-inputText class="mb10" type="password" v-model="userRegistration.password" aria-label="Enter a password" />

      <p class="cwhite">{{ $t('register.confirmP') }}</p>
      <pv-inputText class="mb10" type="password" v-model="userRegistration.confirmPassword"
        aria-label="Confirm the password" />

      <p class="cwhite">{{ $t('register.email') }}</p>
      <pv-inputText class="mb10" type="text" v-model="userRegistration.email" aria-label="Enter a email" />

      <p class="cwhite">{{ $t('register.phone') }}</p>
      <pv-inputText class="mb10" type="text" v-model="userRegistration.cellphone" aria-label="Enter a phone" />

      <p class="cwhite">{{ $t('register.userRole') }}</p>
      <pv-select class="mb10" v-model="userRegistration.userRole" :options="options" option-label="label"
        option-value="value" aria-labelledby="basic" />

      <p class="cwhite mb100 tac">{{ registrationError }}</p>

      <pv-button :label="$t('register.button')" severity="info" class="button-container" @click="handleRegistration" />
      <router-link to="/catalogue">
      </router-link>

      <router-link to="/login">
      <p class="cwhite login">{{ $t('register.oldmsg') }} <br> {{ $t('register.signin')
          }}
      </p>
    </router-link>
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
.card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1em;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.img-container {
  max-width: 100%;
  height: auto;
  margin: 0 90px;
}

.description-container {
  max-width: 400px;
  margin: 0 90px;
}

.register-card {
  background-color: #333333;
  border-radius: 20px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 1em;
}

.title-container {
  text-align: center;
  font-size: 30px;
  font-family: Roboto, sans-serif;
  font-weight: bolder;
  margin-bottom: 20px;
  color: white;
}

.cwhite {
  color: white;
}

.mb10 {
  margin-bottom: 10px;
}

.date-input {
  padding: 0.8em;
  font-size: 1.1em;
  border-radius: 8px;
  margin-bottom: 10px;
}

.button-container {
  width: 100%;
  background-color: #4d94ff;
  color: white;
  margin-bottom: 10px;
  padding: 10px;
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

.tac {
  text-align: center;
}

.login {
  text-align: center;
  margin-top: 0.8em;
}

.login:hover {
  text-decoration: underline;
}

/* Media Queries */
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

  .register-card {
    padding: 1.5em;
    margin: 0 auto;
  }
}

@media (min-width: 670px) {
  .img-container {
    width: 400px;
  }

  .description-container {
    width: 400px;
  }
}

@media (min-width: 900px) {
  .card-container {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
