<script setup lang="ts">
import { z } from 'zod'

const { login } = useAuthApi()

const isOpen = ref(false)
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const schema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
})

function closeModal() {
  isOpen.value = false
  resetForm()
}

function resetForm() {
  form.email = ''
  form.password = ''
  loading.value = false
  errors.email = ''
  errors.password = ''
}

function validate() {
  let isValid = true
  const { error, success } = schema.safeParse(form)

  if (!success) {
    isValid = false

    const issues = error.issues

    errors.email
      = issues.find(item => item.path.includes('email'))?.message ?? ''
    errors.password
      = issues.find(item => item.path.includes('password'))?.message ?? ''
  }
  else {
    errors.email = ''
    errors.password = ''
  }

  return isValid
}

async function handleLogin() {
  if (!validate())
    return

  loading.value = true

  try {
    await login(form)
    loading.value = false
  }
  catch (error) {
    loading.value = false

    throw error
  }

  closeModal()
}
</script>

<template>
  <button
    class="text-white font-semibold px-4 py-2 rounded bg-yellow-500 flex gap-x-2 cursor-pointer shadow items-center justify-center focus:outline-none hover:bg-yellow-600 disabled:opacity-60 focus:ring-3 focus:ring-amber-300"
    @click="isOpen = true"
  >
    {{ $t("login.btn") }}
  </button>

  <div
    v-if="isOpen"
    class="p-4 bg-black/50 flex items-center inset-0 justify-center fixed z-50 backdrop-blur-sm"
    @click="closeModal"
  >
    <div
      class="rounded-2xl bg-white max-w-md w-full shadow-2xl transform transition-all"
      @click.stop
    >
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-xl text-gray-900 font-bold">
            {{ $t("login.title") }}
          </h3>
          <button
            class="text-gray-400 cursor-pointer transition-colors hover:text-gray-600"
            @click="closeModal"
          >
            <div class="i-mdi-close" />
          </button>
        </div>
        <p class="text-sm text-gray-600 mt-1">
          {{ $t("login.subtitle") }}
        </p>
      </div>

      <div class="p-6">
        <form @submit.prevent="handleLogin">
          <div class="space-y-4">
            <!-- Email Field -->
            <div>
              <label
                for="email"
                class="text-sm text-gray-700 font-medium mb-1 block"
              >
                {{ $t("login.email") }}
              </label>

              <input
                id="email"
                v-model="form.email"
                type="email"
                class="px-3 py-2 border border-gray-300 rounded-lg w-full transition-colors focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                :placeholder="$t('login.email_placeholder')"
                :class="{ 'border-red-500': errors.email }"
              >

              <p v-if="errors.email" class="text-xs text-red-500 mt-1">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label
                for="password"
                class="text-sm text-gray-700 font-medium mb-1 block"
              >
                {{ $t("login.password") }}
              </label>

              <input
                id="password"
                v-model="form.password"
                type="password"
                class="px-3 py-2 border border-gray-300 rounded-lg w-full transition-colors focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                :placeholder="$t('login.password_placeholder')"
                :class="{ 'border-red-500': errors.password }"
              >
              <p v-if="errors.password" class="text-xs text-red-500 mt-1">
                {{ errors.password }}
              </p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="text-white font-semibold mt-6 px-4 py-3 rounded-lg bg-yellow-500 flex w-full shadow transition-colors items-center justify-center focus:outline-none disabled:bg-yellow-300 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
          >
            <span v-if="loading" class="mr-2 animate-spin">⟳</span>
            {{ loading ? $t("login.loading") : $t("login.submit") }}
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600 text-center">
            {{ $t("login.no_account") }}
            <a
              href="#"
              class="text-yellow-600 font-medium transition-colors hover:text-yellow-700"
            >
              {{ $t("login.signup") }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
