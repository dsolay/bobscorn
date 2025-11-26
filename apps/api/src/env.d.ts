declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL?: string
    APP_DEBUG?: string
    DEBUG_QUERIES?: string
    PORT?: string
    AUTH_URL_API?: string
    API_KEY_APP_SECURITY?: string
    AWS_CLOUDWATCH_GROUP_NAME?: string
    URL_NOTIFICTIONS_API?: string
    AWS_DEFAULT_REGION?: string
    AWS_PUBLIC_KEY?: string
    AWS_SECRET_KEY?: string
    AWS_BUCKET_NAME?: string
    SECRET_KEY?: string
    CLOUDWATCH_REGION?: string
    CLOUDWATCH_GROUP_NAME?: string
    CHROME_EXECUTBLE_PATH?: string
    ORIGINS?: string
    DEPLOY_STAGE?: string
    API_KEY_MICROSERVICES?: string
    DEPLOY_TYPE?: string
    DEPLOY_TARGET?: string
    API_VERSION?: string
    MODULE_NAME?: string
  }
}
