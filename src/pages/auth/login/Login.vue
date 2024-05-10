<template>
  <form @submit.prevent="submit">
    <va-input
      v-model="formData.email"
      class="mb-4"
      type="email"
      :label="t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="formData.password"
      class="mb-4"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="flex justify-center mt-4">
      <va-button class="my-0" @click="request">{{ t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { computed, ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  let state = 'Ban'
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const router = useRouter()

  const formData = reactive({
    email: '',
    password: '',
  })

  const formReady = computed(() => !emailErrors.value.length && !passwordErrors.value.length)

  function submit() {
    emailErrors.value = state == 'None' ? ['Email does not exist'] : []
    passwordErrors.value = state == 'Ban' ? ['Incorrect password'] : []
    if (state == 'Pass') router.push({ name: 'dash' })
  }

  function request() {
    emailErrors.value = formData.email == '' ? ['Email is empyt'] : []
    passwordErrors.value = formData.password == '' ? ['Password is empyt'] : []
    if (formReady.value) {
      axios
        .get('http://123.207.9.26:5000/login', {
          params: formData,
        })
        .then((response) => {
          state = response.data.state
          console.log(response)
          submit()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
</script>
