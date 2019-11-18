# Map ENV Vars

Fill a variable map with values from ENV vars, selected based on current environment.

## Installation

1. `yarn add map-env-vars` or `npm i map-env-vars`

## Usage

In this example, we map ENV vars in `development` and `production` environments without prefixes.

Note that `envConfig` allows for comma separated lists when accepting configuration options.

For the `staging` environment, ENV variable names are expected to be prefixed with `STAGE_` where ever the `{ENV}` token is used.

This behavior is enabled through the `staging` key in the `envConfig`.

Note that the `HOST` and `PORT` ENV variables are searched for directly, without prefix, because the `{ENV}` token is omitted. This behavior also occurs whenever your current execution ENV is not found as a key in the envConfig object. In these cases, the {ENV} token is ignored during lookup.

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
#   "host": "localhost",
#   "port": 3000
# }
```

**In a `development` environment (not defined in `envConfig` options)**

```bash
NODE_ENV=development BASE_URL=https://test.com ENABLE_DEBUG=true HOST=localhost PORT=3000 node index.js

# {
#   "baseUrl": "https://test.com",
#   "enableDebug": "true",
#   "host": "localhost",
#   "port": 3000
# }

# Note how {ENV} token is ignored when performing lookups. This is because the current
# execution ENV is not found as a key in the envConfig object
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
