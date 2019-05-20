const ENV_TOKEN = '{ENV}'

export default function mapEnvVars(options) {
  if (!options.envData) {
    options.envData = process.env
  }
  if (!options.envCurrent) {
    options.envCurrent = process.env.NODE_ENV
  }
  if (!options.envConfig) {
    throw new TypeError('options.envConfig is required')
  }
  if (!options.varLookups) {
    throw new TypeError('options.varLookups is required')
  }

  const envCurrent = new String(options.envCurrent).toUpperCase()
  let finalVars = {}
  for (let envSet in options.envConfig) {
    envSet.split(',').forEach(env => {
      if (env.toUpperCase() !== envCurrent) {
        return
      }
      const prefixVars = options.envConfig[envSet].prefixVars
      for (let varName in options.varLookups) {
        let varDef = options.varLookups[varName]
        let varKey = varDef.replace(ENV_TOKEN, prefixVars ? `${envCurrent}` : '')
        finalVars[varName] = options.envData[varKey]
      }
    })
  }

  return finalVars
}
