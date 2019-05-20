# Map ENV Vars

Fill a variable map with values from ENV vars, selected based on current environment.

## Usage

In this example, we map ENV vars in `development` and `production` environments without prefixes.
<br>
Note that `envConfig` allows for comma separated lists when accepting configuration options.

For the `staging` environment, ENV variable names are expected to be prefixed with `STAGING_` where ever the `{ENV}` token is used.
<br>This behavior is enabled through the `prefixVars: true` option on the `envConfig`.

Note that the `HOST` and `PORT` ENV variables are searched for directly, without prefix, because the `{ENV}` token is omitted.

**index.js**

```js
import mapEnvVars from 'map-env-vars'

const mappedEnv = mapEnvVars({
  envConfig: {
    'development,production': { prefixVars: false },
    staging: { prefixVars: true }
  },
  varLookups: {
    baseUrl: '{ENV}_BASE_URL',
    enableDebug: '{ENV}_ENABLE_DEBUG',
    port: 'PORT',
    host: 'HOST'
  }
})

console.log(mappedEnv)
```

**In a `development` environment**

```json
NODE_ENV=development BASE_URL=https://test.com ENABLE_DEBUG=true HOST=localhost PORT=3000 node index.js

# {
#   "baseUrl": "https://test.com",
#   "enableDebug": "true",
#   "host": "localhost",
#   "port": 3000
# }
```

**In a `staging` environment w/ properly prefixed variable names**

```json
NODE_ENV=staging STAGING_BASE_URL=https://test.com STAGING_ENABLE_DEBUG=true HOST=localhost PORT=3000 node index.js

# {
#   "baseUrl": "https://test.com",
#   "enableDebug": "true",
#   "host": "localhost",
#   "port": 3000
# }
```

**CLI, run in `staging` environment w/ incorrectly prefixed variable names**

```json
NODE_ENV=staging DEV_BASE_URL=https://test.com ENABLE_DEBUG=true HOST=localhost PORT=3000 node index.js

# {
#   "baseUrl": undefined,
#   "enableDebug": undefined,
#   "host": "localhost",
#   "port": 3000
# }
```

## Options

```js
mapEnvVars({
  // defaults to `process.env`
  envData: { myFakeEnvData: true },
  // defaults to `process.env.NODE_ENV`
  envCurrent: 'staging',
  // required
  envConfig: {
    'ENV_NAME[, ...]': { prefixVars: Boolean }
    // ...
  },
  // required
  varLookups: {
    friendlyVarName: '{ENV}_BIG_SCARY_VAR_NAME'
    // ...
  }
})
```
