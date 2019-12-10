import assert from 'assert'
import mapEnvVars from '../index'

const mockEnvData = {
  HOST: 'localhost',
  PORT: 3000,
  BASE_URL: 'http://prod-site.com',
  ENABLE_DEBUG: 'false',
  DEV_BASE_URL: 'http://dev-site.com',
  DEV_ENABLE_DEBUG: 'true',
  STAGE_BASE_URL: 'https://staging-site.com',
  STAGE_ENABLE_DEBUG: 'true'
}

const envConfig = {
  staging: 'STAGE_',
  remote_development: 'DEV_'
}

const varLookups = {
  baseUrl: '{ENV}BASE_URL',
  enableDebug: '{ENV}ENABLE_DEBUG',
  missingVar: '{ENV}MISSING_VAR',
  host: 'HOST',
  port: 'PORT'
}

const developmentMappedEnv = mapEnvVars({
  // By default, envData is mapped to `process.env`
  // Here, the envData value is overridden for illustration purposes
  envData: mockEnvData,
  // By default, envCurrent is mapped to `process.env.NODE_ENV`
  // Here, it is mapped to a value to aid in testing
  envCurrent: 'development',
  // These options are typically defined inline, but for testing purposes
  // they are set above and reused below
  envConfig,
  varLookups
})

const remoteDevMappedEnv = mapEnvVars({
  envData: mockEnvData,
  envCurrent: 'remote_development',
  envConfig,
  varLookups
})

const stagingMappedEnv = mapEnvVars({
  envData: mockEnvData,
  envCurrent: 'staging',
  envConfig,
  varLookups
})

const prodMappedEnv = mapEnvVars({
  envData: mockEnvData,
  envCurrent: 'production',
  envConfig,
  varLookups
})

// Development env assertions
assert.strictEqual(developmentMappedEnv.baseUrl, 'http://prod-site.com')
assert.strictEqual(developmentMappedEnv.enableDebug, 'false')
assert.strictEqual(developmentMappedEnv.host, 'localhost')
assert.strictEqual(developmentMappedEnv.port, 3000)

// Remote development env assertions
assert.strictEqual(remoteDevMappedEnv.baseUrl, 'http://dev-site.com')
assert.strictEqual(remoteDevMappedEnv.enableDebug, 'true')
assert.strictEqual(remoteDevMappedEnv.host, 'localhost')
assert.strictEqual(remoteDevMappedEnv.port, 3000)

// Staging env assertions
assert.strictEqual(stagingMappedEnv.baseUrl, 'https://staging-site.com')
assert.strictEqual(stagingMappedEnv.enableDebug, 'true')
assert.strictEqual(stagingMappedEnv.host, 'localhost')
assert.strictEqual(stagingMappedEnv.port, 3000)

// Prod env assertions
assert.strictEqual(prodMappedEnv.baseUrl, 'http://prod-site.com')
assert.strictEqual(prodMappedEnv.enableDebug, 'false')
assert.strictEqual(prodMappedEnv.host, 'localhost')
assert.strictEqual(prodMappedEnv.port, 3000)

// Undefined env assertions
assert.strictEqual(stagingMappedEnv.missingVar, undefined)

// 🎉
console.log('Tests ran successfully')
