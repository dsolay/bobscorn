<script setup lang="ts">
const { locales, setLocale } = useI18n()
const selectedLocale = ref<'en' | 'es'>('en')

function handleLocaleChange() {
  setLocale(selectedLocale.value)
}
</script>

<template>
  <div>
    <label for="language" class="sr-only">Language</label>
    <select
      id="language"
      v-model="selectedLocale"
      class="px-4 py-2 rounded bg-white w-30 cursor-pointer shadow-sm focus:outline-none hover:bg-neutral-100 focus:ring-3 focus:ring-gray-200"
      @change="handleLocaleChange"
    >
      <option
        v-for="locale in locales"
        :key="locale.code"
        :value="locale.code"
      >
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>
