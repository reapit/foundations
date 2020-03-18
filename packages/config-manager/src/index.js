const AWS = require('aws-sdk')
const fs = require('fs')

const { generateConfigTsDef } = require('./utils/generate-config-ts-def')
const handleFetchingSecretFail = require('./utils/handle-fetching-secret-fail')
const { writeConfigInCWD } = require('./utils/write-config-in-cwd')

const prompts = require('prompts')

const { REAPIT_CONFIG_IN_CWD_PATH, TEMP_FOLDER, TEMP_LOCAL_CONFIG_FILE, TEMP_REMOTE_CONFIG_FILE } = require('./paths')

AWS.config.update({ region: 'eu-west-2' })

const secretsManager = new AWS.SecretsManager()
const ssm = new AWS.SSM()

const createSecret = secretName => {
  secretsManager.createSecret(
    {
      Name: secretName,
      SecretString: JSON.stringify(require(REAPIT_CONFIG_IN_CWD_PATH)),
    },
    (err, data) => {
      if (err) {
        console.error(err, err.stack)
        process.exit(1)
      }

      return console.log('Successfully created secret', data)
    },
  )
}

const updateSecret = async secretName => {
  try {
    if (!fs.existsSync(TEMP_FOLDER)) {
      fs.mkdirSync(TEMP_FOLDER)
    }

    // write secret string fetched from AWS to .temp/remote-config.json
    const { SecretString } = await secretsManager
      .getSecretValue({
        SecretId: secretName,
      })
      .promise()
    fs.writeFileSync(TEMP_REMOTE_CONFIG_FILE, SecretString)
    console.log(`Your remote configuration have been saved to: ${TEMP_REMOTE_CONFIG_FILE}`)

    // write secret string from root directory's reapit-config.json to .temp/remote-config.json
    const localConfig = fs.readFileSync(REAPIT_CONFIG_IN_CWD_PATH).toString()
    fs.writeFileSync(TEMP_LOCAL_CONFIG_FILE, localConfig)
    console.log(`Your local configuration have been saved to: ${TEMP_LOCAL_CONFIG_FILE}`)

    console.log(
      // eslint-disable-next-line max-len
      `Please review/update your changes in the local configuration files on the ".temp" folder located at ${TEMP_FOLDER}`,
    )

    const response = await prompts({
      type: 'text',
      name: 'value',
      message: 'Type "update" and hit <RETURN/ENTER> to confirm and submit your changes:',
      // eslint-disable-next-line
      validate: value => (value !== 'update' ? 'Invalid phrase' : true),
    })

    const isResponseEmpty = typeof response !== 'object' || Object.keys(response).length === 0
    if (isResponseEmpty) {
      console.error('Update secret process has been cancelled')
      process.exit(1)
    }

    // submit config
    const updatedConfig = require(TEMP_LOCAL_CONFIG_FILE)

    const data = await secretsManager
      .updateSecret({
        SecretId: secretName,
        SecretString: JSON.stringify(updatedConfig),
      })
      .promise()

    return console.log('Successfully updated secret', data)
  } catch (err) {
    console.log('Something went wrong when updating configuration. Detailed error with stack trace is provided below:')
    console.log(err, err.stack)
    process.exit(1)
  }
}

const getSecret = (secretName, reapitEnv = 'LOCAL', isGenerateConfigTsDef = false) => {
  secretsManager.getSecretValue(
    {
      SecretId: secretName,
    },
    (err, data) => {
      if (err) {
        return handleFetchingSecretFail(err, isGenerateConfigTsDef)
      }

      try {
        const config = data.SecretString
        let parsedConfig = null
        parsedConfig = JSON.parse(config)
        const configMatchEnv = parsedConfig[reapitEnv]

        if (!configMatchEnv) {
          console.error(`No config match ENV "${reapitEnv}"`)
          process.exit(1)
        }

        if (isGenerateConfigTsDef) {
          generateConfigTsDef(config)
        }

        return writeConfigInCWD(JSON.stringify({ [reapitEnv]: configMatchEnv }))
      } catch (err) {
        console.log(
          'Something went wrong when parsing base configuration. Detailed error with stack trace is provided below:',
        )
        console.log(err, err.stack)
        process.exit(1)
      }
    },
  )
}

const getAllSecrets = (secretName, isGenerateConfigTsDef = false) => {
  secretsManager.getSecretValue(
    {
      SecretId: secretName,
    },
    (err, data) => {
      if (err) {
        generateConfigTsDef(err, isGenerateConfigTsDef)
      }

      const config = data.SecretString

      if (isGenerateConfigTsDef) {
        generateConfigTsDef(config)
      }

      return writeConfigInCWD(config)
    },
  )
}

const deleteSecret = secretName => {
  secretsManager.deleteSecret(
    {
      RecoveryWindowInDays: 7,
      SecretId: secretName,
    },
    (err, data) => {
      if (err) {
        console.error(err, err.stack)
        process.exit(1)
      }
      return console.log('Successfully deleted secret', data)
    },
  )
}

const setEnv = secretName => {
  secretsManager.getSecretValue(
    {
      SecretId: secretName,
    },
    (err, data) => {
      if (err) {
        console.error(err, err.stack)
        process.exit(1)
      }

      const env = process.env.REAPIT_ENV
      const secret = JSON.parse(data.SecretString)
      const envObject = secret[env]

      Object.keys(envObject).forEach(key => {
        process.env[key] = envObject[key]
      })

      return console.log('Successfully saved env to process')
    },
  )
}

const fetchConfig = (secretName, env = 'local') => {
  // TODO: will remove if when finish migration
  if (env === 'LOCAL') {
    env = 'local'
  }
  ssm.getParameter({ Name: `${secretName}-${env}`, WithDecryption: false }, (err, data) => {
    if (err) {
      console.log('Something went wrong when fetch the config.json')
      console.error(err, err.stack)
      process.exit(1)
    }
    try {
      const config = (data && data.Parameter && data.Parameter.Value) || {}
      return fs.writeFileSync(`${process.cwd()}/public/config.json`, config)
    } catch (err) {
      console.log(
        'Something went wrong when parsing base configuration. Detailed error with stack trace is provided below:',
      )
      console.error(err, err.stack)
      process.exit(1)
    }
  })
}

module.exports = { getSecret, createSecret, updateSecret, deleteSecret, setEnv, getAllSecrets, fetchConfig }
