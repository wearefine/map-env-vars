import mapEnvVars from './index'

const mappedEnv = mapEnvVars({
  envConfig: {
    'remote_development': 'DEV_',
    'staging': 'STAGE_'
  },
  varLookups: {
    baseUrl: '{ENV}BASE_URL',
    enableDebug: '{ENV}ENABLE_DEBUG',
    host: 'HOST',
    port: 'PORT'
  }
})

console.log(mappedEnv)