<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="email"
      class="mb-4"
      type="email"
      :label="t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      class="mb-4"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options flex items-center justify-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="t('auth.keep_logged_in')" />
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
        t('auth.recover_password')
      }}</router-link>
    </div>

    <div class="flex justify-center mt-4">
      <va-button class="my-0" @click="request">{{ t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  
  let state = 'Ban'
  const email = ref('')
  const password = ref('')
  const keepLoggedIn = ref(false)
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const router = useRouter()

  const formReady = computed(() => !emailErrors.value.length && !passwordErrors.value.length)

  function onsubmit() {
    emailErrors.value = state == 'None' ? ['Email does not exist'] : []
    console.log(emailErrors.value)
    passwordErrors.value = state == 'Ban' ? ['Incorrect password'] : []
    console.log(passwordErrors.value)
    if (state != 'Pass') return
    else router.push({ name: 'dashboard' })
  }

  function request() {
    axios.post('http://123.207.9.26:5000/vue', 
              { email_value: email.value, password_value: password.value})
              .then(response => { state = response.data.state;
                                  console.log(state);
                                  onsubmit(); })
              .catch(error => {  console.error(error); })
  }
</script>
