/* eslint-disable no-console */
import { format } from 'node:util'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@/generated/prisma/client.js'

const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/dev.db',
})
export const prisma = new PrismaClient({
  adapter,
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

if (process.env.DEBUG_QUERIES === 'true') {
  prisma.$on('query', (event) => {
    console.log(`Query: ${event.query}`)
    console.log(`Params: ${event.params}`)
    console.log(format('Duration: %s ms', event.duration))
  })
}
