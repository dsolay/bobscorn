import { isObject } from '@/utils/index.js'
import type { AnyObject, ErrorResponse } from '@/types/index.js'
import { MicroserviceError } from '@/errors/index.js'
import { APP_ERROR } from '@/constants/index.js'
import deepmerge from 'deepmerge'
import { isPlainObject } from 'is-plain-object'

type AuthMethod = 'bearer' | 'apiKey' | 'basic' | 'custom' | 'none'

type RequestOptions = RequestInit & {
  params?: Record<string, string>
  auth?: boolean
}

function isErrorResponse(error: unknown): error is ErrorResponse {
  return (
    isObject(error)
    && 'error' in error
    && isObject(error.error)
    && 'message' in error.error
    && 'code' in error.error
    && 'type' in error.error
  )
}

export abstract class BaseApi {
  protected token: string | undefined
  readonly #authMethod!: AuthMethod
  readonly #baseUrl: string

  constructor(baseUrl: string, token?: string, authMethod?: AuthMethod) {
    this.#baseUrl = baseUrl
    this.token = token
    this.#authMethod = authMethod ?? 'bearer'
  }

  protected async post<Result, Body = AnyObject>(
    url: string,
    body: { data: Body } | Body,
    options?: RequestOptions,
  ): Promise<Result> {
    const _url = new URL(`${this.#baseUrl}/${url}`)

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        _url.searchParams.append(key, value)
      })
    }

    return await this.request<Result>(_url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  protected async get<Result>(url: string, options?: RequestOptions): Promise<Result> {
    const _url = new URL(`${this.#baseUrl}/${url}`)

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        _url.searchParams.append(key, value)
      })
    }

    return await this.request<Result>(_url, { ...options, method: 'GET' })
  }

  protected async formUrlencoded<Result>(
    url: string,
    body: Record<string, string>,
    options?: RequestOptions,
  ): Promise<Result> {
    const _url = new URL(`${this.#baseUrl}/${url}`)

    const parameters = new URLSearchParams()
    Object.entries(body).forEach(([key, value]) => {
      parameters.append(key, value)
    })

    return await this.request<Result>(_url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...options,
      method: 'POST',
      body: parameters,
    })
  }

  protected async request<T>(url: string | URL, options?: RequestOptions): Promise<T> {
    const auth = options?.auth ?? true
    let authOptions: RequestInit = {}

    if (auth && this.#authMethod !== 'none') authOptions = await this.authentication()

    const _options = deepmerge.all<RequestInit>(
      [{ headers: { 'Content-Type': 'application/json' } }, options ?? {}, authOptions],
      { isMergeableObject: isPlainObject },
    )

    const response = await fetch(url, _options)

    if (!response.ok) {
      const error = await response.json()

      const details: ErrorResponse['error'] = isErrorResponse(error)
        ? error.error
        : {
            message: 'Unknown error',
            code: APP_ERROR.UNKNOWN_ERROR,
            type: 'UnknownError',
            details: isObject(error) ? error : { message: error },
          }

      throw new MicroserviceError(details)
    }

    return (await response.json()) as T
  }

  protected authentication(): Promise<RequestInit> | RequestInit {
    if (this.token === undefined) return {}

    const options: RequestInit = {}

    switch (this.#authMethod) {
      case 'bearer':
        options.headers = { Authorization: `Bearer ${this.token}` }
        break
      case 'apiKey':
        options.headers = { 'x-api-key': this.token }
        break
      case 'basic':
        options.headers = { Authorization: `Basic ${this.token}` }
    }

    return options
  }
}
