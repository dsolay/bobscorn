<script setup lang="ts">
const { logout } = useAuthApi()
</script>

<template>
  <button
    id="logoutBtn"
    class="text-red-500 px-4 py-2 border border-red-500 rounded cursor-pointer transition-colors focus:outline-none active:bg-red-100 hover:bg-red-100 focus:ring-3 focus:ring-red-200"
    @click="logout"
  >
    {{ $t("logout.btn") }}
  </button>
</template>
