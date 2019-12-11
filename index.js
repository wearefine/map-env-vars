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
  for (const [finalName, sourceName] of Object.entries(options.varLookups)) {
    // Pass var through if token replacement isn't requested
    if (sourceName.includes(ENV_TOKEN) == false) {
      finalVars[finalName] = options.envData[sourceName]
    } else {
      // If token replacement is requested, check for envCurrent config
      let finalReplacement = ''
      for (const [sourceEnv, replacement] of Object.entries(options.envConfig)) {
        // Ignore if env mismatch or token is falsey
        if (sourceEnv.toUpperCase() == envCurrent) {
          finalReplacement = replacement
        }
      }
      // Map final var from prefixed source
      const lookupKey = sourceName.replace(ENV_TOKEN, finalReplacement)
      finalVars[finalName] = options.envData[lookupKey]

      // Check for undefined and roll back to unprefixed value
      if (!finalVars[finalName]) {
        const baselineLookup = sourceName.replace(ENV_TOKEN, '')
        finalVars[finalName] = options.envData[baselineLookup]
      }
    }
  }

  return finalVars
}
