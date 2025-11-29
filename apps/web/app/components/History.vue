<script setup lang="ts">
import type { History } from '@@/types'
import { formatTimeAgoIntl } from '@vueuse/core'

const props = defineProps<{ history: History[] }>()

const { locale } = useI18n()
</script>

<template>
  <div class="mt-4">
    <h4 class="text-lg font-medium mb-2">
      {{ $t("portal.status.history") }}
    </h4>

    <ul
      id="history"
      class="text-sm text-gray-700 max-h-64 overflow-auto space-y-1"
    >
      <li
        v-for="item in props.history"
        :key="item.id"
        class="history-item p-4 border border-l-4 border-gray-200 border-green-500 rounded-lg bg-white shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div class="flex gap-3 items-center">
            <div
              class="text-green-600 rounded-full bg-green-100 flex shrink-0 h-10 w-10 items-center justify-center"
            >
              <div class="i-twemoji-ear-of-corn" />
            </div>

            <div>
              <div class="text-gray-800 font-semibold">
                {{ $t('portal.notifications.success') }}
              </div>

              <div class="text-sm text-gray-600">
                {{ formatTimeAgoIntl(item.date, { locale }) }}
              </div>
            </div>
          </div>

          <div class="text-right">
            <div class="text-lg text-gray-700 font-bold font-mono">
              {{ item.total }}
            </div>

            <div class="text-xs text-gray-600">
              {{ $t('portal.notifications.quantity', { quantity: item.quantity }) }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
