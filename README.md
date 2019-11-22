🔗 [NPM Package](https://www.npmjs.com/package/map-env-vars)

# Map ENV Vars

Fill a variable map with values from ENV vars, selected based on current environment.

## Installation

1. `yarn add map-env-vars` or `npm i map-env-vars`

## Usage

In this example, we map ENV vars in `development` and `production` environments without prefixes.

For the `remote_development` environment, ENV variable names are expected to be prefixed with `STAGE_` where ever the `{ENV}` token is used. For the `staging` environment, ENV variable names are expected to be prefixed with `STAGE_` where ever the `{ENV}` token is used.

This behavior is defined by the key-value pairs of `envConfig`.

Note that the `HOST` and `PORT` ENV variables are searched for directly, without prefix, because the `{ENV}` token is omitted from their `varLookups` definition. This behavior also occurs whenever your current execution ENV is not found as a key in the envConfig object. In these cases, the {ENV} token is ignored during lookup.

**index.js**

```js
import mapEnvVars from 'map-env-vars'

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
```

**In a `staging` environment, w/ prefix defined in `envConfig` options, w/ properly prefixed variable names**

```bash
NODE_ENV=staging BASE_URL=https://other-test.com STAGE_BASE_URL=https://test.com STAGE_ENABLE_DEBUG=true HOST=0.0.0.0 PORT=3100 node index.js

# {
#   "baseUrl": "https://test.com",
#   "enableDebug": "true",
#   "host": "0.0.0.0",
#   "port": 3100
# }
```

**In a `qa` environment (not defined in `envConfig` options)**

```bash
NODE_ENV=qa BASE_URL=https://test.com ENABLE_DEBUG=true node index.js

# {
#   "baseUrl": "https://test.com",
#   "enableDebug": "true",
#   "host": undefined,
#   "port": undefined
# }

# Note how {ENV} token is ignored when performing lookups. This is because the current
# execution ENV is not found as a key in the envConfig object.
# There are also undefined values here because some ENV values were not set during invocation.
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
    'ENV_ID': 'ENV_REPLACEMENT_'
    // ...
  },
  // required
  varLookups: {
    friendlyVarName: '{ENV}_BIG_SCARY_VAR_NAME'
    // ...
  }
})
```
