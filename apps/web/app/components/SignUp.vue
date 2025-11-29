<script setup lang="ts">
import { z } from 'zod'

const emit = defineEmits(['signIn'])

const { register, login } = useAuthApi()

const isOpen = defineModel({ default: false })
const loading = ref(false)

const form = reactive({
  name: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive({
  name: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const schema = z
  .object({
    name: z.string({ message: 'required' }).nonempty({ message: 'minLength' }),
    lastname: z
      .string({ message: 'required' })
      .nonempty({ message: 'minLength' }),
    email: z.email({ message: 'email' }),
    password: z
      .string({ message: 'required' })
      .min(8, { message: 'minLength' }),
    confirmPassword: z
      .string({ message: 'required' })
      .min(8, { message: 'minLength' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'confirmPassword',
  })

function resetForm() {
  form.name = ''
  form.lastname = ''
  form.email = ''
  form.password = ''
  form.confirmPassword = ''
  loading.value = false
  resetErrors()
}

function resetErrors() {
  errors.name = ''
  errors.lastname = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
}

function validate() {
  let isValid = true
  const { error, success } = schema.safeParse(form)

  if (!success) {
    isValid = false

    const issues = error.issues

    errors.name
      = issues.find(item => item.path.includes('name'))?.message ?? ''
    errors.lastname
      = issues.find(item => item.path.includes('lastname'))?.message ?? ''
    errors.email
      = issues.find(item => item.path.includes('email'))?.message ?? ''
    errors.password
      = issues.find(item => item.path.includes('password'))?.message ?? ''
    errors.confirmPassword
      = issues.find(item => item.path.includes('confirmPassword'))?.message
        ?? ''
  }
  else {
    resetErrors()
  }

  return isValid
}

async function handleSignUp() {
  if (!validate())
    return

  loading.value = true

  try {
    await register(form)
    await login({ email: form.email, password: form.password })

    loading.value = false
  }
  catch (error) {
    loading.value = false

    throw error
  }

  closeModal()
}

function closeModal() {
  isOpen.value = false
  resetForm()
}
</script>

<template>
  <div
    v-if="isOpen"
    id="registerModal"
    class="p-4 bg-black/50 flex items-center inset-0 justify-center fixed z-50 backdrop-blur-sm"
  >
    <div
      class="rounded-2xl bg-white max-w-md w-full shadow-2xl transform transition-all overflow-hidden"
    >
      <div
        class="text-white p-6 from-yellow-400 to-yellow-500 bg-gradient-to-r"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              class="rounded-full bg-white/20 flex h-10 w-10 items-center justify-center"
            >
              <div class="i-twemoji-ear-of-corn" />
            </div>

            <div>
              <h3 class="text-xl font-bold">
                {{ $t("register.title") }}
              </h3>

              <p class="text-sm text-yellow-100">
                {{ $t("register.subtitle") }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="text-yellow-100 cursor-pointer transition-colors hover:text-white"
            @click="closeModal"
          >
            <div class="i-mdi-close" />
          </button>
        </div>
      </div>

      <div class="p-6">
        <form class="space-y-4" @submit.prevent="handleSignUp">
          <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
            <div>
              <label
                for="firstName"
                class="text-sm text-gray-700 font-medium mb-1 block"
              >
                {{ $t("register.firstName") }}
              </label>

              <input
                id="firstName"
                v-model="form.name"
                type="text"
                class="px-3 py-2 border border-gray-300 rounded-lg w-full transition-colors focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                :placeholder="$t('register.firstNamePlaceholder')"
                :class="{ 'border-red-500': errors.name }"
              >

              <p v-if="errors.name" class="text-xs text-red-500 mt-1">
                {{
                  $t(`validations.${errors.name}`, {
                    min: 1,
                  })
                }}
              </p>
            </div>

            <div>
              <label
                for="lastName"
                class="text-sm text-gray-700 font-medium mb-1 block"
              >
                {{ $t("register.lastName") }}
              </label>

              <input
                id="lastName"
                v-model="form.lastname"
                type="text"
                class="px-3 py-2 border border-gray-300 rounded-lg w-full transition-colors focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                :placeholder="$t('register.lastNamePlaceholder')"
                :class="{ 'border-red-500': errors.lastname }"
              >

              <p v-if="errors.lastname" class="text-xs text-red-500 mt-1">
                {{
                  $t(`validations.${errors.lastname}`, {
                    min: 1,
                  })
                }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="email"
              class="text-sm text-gray-700 font-medium mb-1 block"
            >
              {{ $t("register.email") }} *
            </label>

            <input
              id="signUpEmail"
              v-model="form.email"
              type="email"
              class="px-3 py-2 border border-gray-300 rounded-lg w-full transition-colors focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
              :placeholder="$t('register.emailPlaceholder')"
              :class="{ 'border-red-500': errors.email }"
            >

            <p v-if="errors.email" class="text-xs text-red-500 mt-1">
              {{
                $t(`validations.${errors.email}`, {
                  min: 1,
                })
              }}
            </p>
          </div>

          <div>
            <label
              for="password"
              class="text-sm text-gray-700 font-medium mb-1 block"
            >
              {{ $t("register.password") }} *
            </label>

            <input
              id="signUpPassword"
              v-model="form.password"
              type="password"
              class="px-3 py-2 border border-gray-300 rounded-lg w-full transition-colors focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
              :placeholder="$t('register.passwordPlaceholder')"
              :class="{ 'border-red-500': errors.password }"
            >

            <p v-if="errors.password" class="text-xs text-red-500 mt-1">
              {{
                $t(`validations.password.${errors.password}`, {
                  min: 8,
                })
              }}
            </p>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="text-sm text-gray-700 font-medium mb-1 block"
            >
              {{ $t("register.confirmPassword") }} *
            </label>

            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              class="px-3 py-2 border border-gray-300 rounded-lg w-full transition-colors focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
              :placeholder="$t('register.confirmPasswordPlaceholder')"
              :class="{ 'border-red-500': errors.password }"
            >

            <p v-if="errors.confirmPassword" class="text-xs text-red-500 mt-1">
              {{
                $t(`validations.${errors.confirmPassword}`, {
                  min: 8,
                  n: 8,
                })
              }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="text-white font-semibold px-4 py-3 rounded-lg w-full cursor-pointer shadow-lg from-yellow-500 to-yellow-600 bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:from-yellow-600 hover:to-yellow-700"
          >
            <span v-if="loading" class="mr-2 animate-spin">⟳</span>
            {{ loading ? $t("login.loading") : $t("register.submit") }}
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600 text-center">
            {{ $t("register.haveAccount") }}
            <a
              href="#"
              class="text-yellow-600 font-medium transition-colors hover:text-yellow-700"
              @click="emit('signIn')"
            >
              {{ $t("register.loginLink") }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
