import assert from 'assert'
import mapEnvVars from '../index'

const mockEnvData = {
  BASE_URL: 'https://prod-site.com',
  ENABLE_DEBUG: 'false',
  HOST: 'localhost',
  PORT: 3000,
  STAGING_BASE_URL: 'https://staging-site.com',
  STAGING_ENABLE_DEBUG: 'true'
}

const envConfig = {
  'development, production': { prefixVars: false },
  staging: { prefixVars: true }
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
  // Here, the evnData value is overridden for illustration purposes
  envData: mockEnvData,
  // By default, envCurrent is mapped to `process.env.NODE_ENV`
  // Here, it is mapped to a value to aid in testing
  envCurrent: 'development',
  // These options are typically defined inline, but for testing purposes
  // they are set above and reused below
  envConfig,
  varLookups
})

const stagingMappedEnv = mapEnvVars({
  envData: mockEnvData,
  envCurrent: 'staging',
  envConfig,
  varLookups
})

// Development env assertions
assert.strictEqual(developmentMappedEnv.baseUrl, 'https://prod-site.com')
assert.strictEqual(developmentMappedEnv.enableDebug, 'false')
assert.strictEqual(developmentMappedEnv.host, 'localhost')
assert.strictEqual(developmentMappedEnv.port, 3000)

// Staging env assertions
assert.strictEqual(stagingMappedEnv.baseUrl, 'https://staging-site.com')
assert.strictEqual(stagingMappedEnv.enableDebug, 'true')
assert.strictEqual(stagingMappedEnv.host, 'localhost')
assert.strictEqual(stagingMappedEnv.port, 3000)

// Undefined env assertions
assert.strictEqual(stagingMappedEnv.missingVar, undefined)

// 🎉
console.log('Tests ran successfully')
