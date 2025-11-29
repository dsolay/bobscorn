<script setup lang="ts">
import type { ErrorResponse } from '@@/types'
import { toast, Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

onUnhandledFetchError((error) => {
  const data = error.data as ErrorResponse
  const message = data.error.message || 'Unexpected Server Error'
  toast.error(message)
})
</script>

<template>
  <NuxtLayout>
    <Toaster position="top-right" />
    <NuxtPage />
  </NuxtLayout>
</template>
