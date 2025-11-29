<script setup>
</script>

<template>
  <div
    class="p-6 flex flex-col min-h-screen items-center justify-center from-yellow-50 to-yellow-100 via-white bg-gradient-to-b"
  >
    <header class="mb-8 flex flex-col gap-6 items-center justify-center sm:flex-row">
      <div
        class="text-2xl text-white rounded-full bg-yellow-500 flex shrink-0 h-16 w-16 shadow-lg items-center justify-center"
      >
        <div class="i-twemoji-ear-of-corn" />
      </div>

      <div>
        <h1 class="text-2xl leading-tight font-extrabold sm:text-4xl">
          {{ $t("title") }}
        </h1>
      </div>

      <LanguageSelector />
    </header>

    <section class="flex w-full justify-center">
      <slot />
    </section>

    <footer class="text-xs text-gray-500 mt-8 text-center">
      {{ $t('footer') }}
    </footer>
  </div>
</template>
