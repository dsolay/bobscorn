<script setup lang="ts">
import type { ErrorResponse, History } from '@@/types'
import { useStorage } from '@vueuse/core'
import { FetchError } from 'ofetch'

const { buyCorn, getCornHistory } = useCornApi()
const { remaining, start } = useCountdown(0)
const state = useStorage('storage', { retryAfter: '' })
const store = useAuthStore()

const bought = ref(0)
const history = ref<History[]>([])

async function fetchHistory() {
  const response = await getCornHistory()
  history.value = response.data.map(item => ({
    ...item,
    date: new Date(item.createdAt),
  }))
}

function getNextAllowed(after: string) {
  const now = new Date().getTime()
  const target = new Date(after).getTime()

  return Math.ceil((target - now) / 1000)
}

async function handleBuyCorn() {
  const total = (history.value.at(-1)?.total ?? 0) + 1
  const date = new Date()

  try {
    await buyCorn({
      quantity: 1,
      total,
      date: date.toISOString(),
    })
  }
  catch (error) {
    if (error instanceof FetchError) {
      const data = error.data as ErrorResponse

      if (data?.error.details?.retryAfter) {
        const retry = data.error.details.retryAfter as string
        const diff = getNextAllowed(retry)

        state.value.retryAfter = retry

        start(diff)
      }
    }

    throw error
  }

  bought.value++

  history.value.push({
    id: Number(unique()),
    quantity: 1,
    total,
    date,
  })
}

store.$subscribe(async (_, state) => {
  if (state.user) {
    await fetchHistory()
  }
  else {
    history.value = []
    bought.value = 0
  }
})

// HACK: Vue doesn't detect user state changes when reload the page
onMounted(async () => {
  await fetchHistory()
})

onBeforeMount(() => {
  const diff = getNextAllowed(state.value.retryAfter)

  if (diff > 0)
    start(diff)
})
</script>

<template>
  <aside class="p-6 rounded-xl bg-white flex-1 max-w-md shadow">
    <div class="flex flex-col gap-y-2 items-center justify-between sm:flex-row">
      <h3 class="text-lg font-semibold">
        {{ $t("portal.title") }}
      </h3>

      <Login v-if="!store.user" />

      <Logout v-else />
    </div>

    <button
      id="buyBtn"
      class="text-white font-semibold mt-6 px-4 py-2 rounded bg-yellow-500 flex gap-x-2 w-full cursor-pointer shadow items-center justify-center focus:outline-none hover:bg-yellow-600 disabled:opacity-60 focus:ring-3 focus:ring-amber-300"
      @click="handleBuyCorn"
    >
      {{ $t("portal.form.actions.submit") }}
      <div class="i-twemoji-ear-of-corn shrink-0" />
    </button>

    <dl class="text-sm text-gray-700 mt-4 gap-2 grid grid-cols-1 sm:grid-cols-2">
      <div class="p-3 rounded bg-yellow-50">
        <dt class="text-xs text-gray-500">
          {{ $t("portal.status.bought") }}
        </dt>

        <dd id="bought" class="text-2xl font-bold">
          {{ bought }}
        </dd>
      </div>

      <div class="p-3 rounded bg-yellow-50">
        <dt class="text-xs text-gray-500">
          {{ $t("portal.status.nextAllowed") }}
        </dt>

        <dd id="nextAllowed" class="text-2xl font-bold">
          {{ remaining }}
        </dd>
      </div>
    </dl>

    <History :history="history" />
  </aside>
</template>
