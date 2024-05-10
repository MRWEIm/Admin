<template>
  <form @submit.prevent="onsubmit()">
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
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :error-messages="agreedToTermsErrors"
      >
        <template #label>
          <span class="ml-2">
            {{ t('auth.agree') }}
            <span class="va-link">{{ t('auth.termsOfUse') }}</span>
          </span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">
        {{ t('auth.recover_password') }}
      </router-link>
    </div>

    <div class="flex justify-center mt-4">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  let state = 'Exist'
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const agreedToTerms = ref(false)
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const agreedToTermsErrors = ref<string[]>([])

  const formReady = computed(() => {
    return !(emailErrors.value.length || passwordErrors.value.length || agreedToTermsErrors.value.length)
  })

  function onsubmit() {
    emailErrors.value = email.value ? [] : ['Email is required']
    passwordErrors.value = password.value ? [] : ['Password is required']
    agreedToTermsErrors.value = agreedToTerms.value ? [] : ['You must agree to the terms of use to continue']

    if (!formReady.value) return
    else signup()
  }

  function signup() {
    axios
      .post('http://123.207.9.26:5000/signup', { email_value: email.value, password_value: password.value })
      .then((response) => {
        state = response.data.state
        console.log(state)
        check()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function check() {
    emailErrors.value = state == 'Exist' ? ['Email is existed'] : []
    if (!formReady.value) return
    else router.push({ name: 'dashboard' })
  }
</script>
