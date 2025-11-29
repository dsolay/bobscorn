<script setup lang="ts">
const isLoginModalOpen = ref(false)
</script>

<template>
  <Login v-model="isLoginModalOpen" />

  <button
    class="text-white font-semibold px-4 py-2 rounded bg-yellow-500 flex gap-x-2 cursor-pointer shadow items-center justify-center focus:outline-none hover:bg-yellow-600 disabled:opacity-60 focus:ring-3 focus:ring-amber-300"
    @click="isLoginModalOpen = true"
  >
    {{ $t("login.btn") }}
  </button>
</template>
