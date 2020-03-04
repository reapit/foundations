const AWS = require('aws-sdk')
const fs = require('fs')

const { generateConfigTsDef } = require('./utils/generate-config-ts-def')
const { handleFetchingSecretFail } = require('./utils/handle-fetching-secret-fail')
const { writeConfigInCWD } = require('./utils/write-config-in-cwd')

const prompts = require('prompts')

const { REAPIT_CONFIG_IN_CWD_PATH, TEMP_FOLDER, TEMP_LOCAL_CONFIG_FILE, TEMP_REMOTE_CONFIG_FILE } = require('./paths')

AWS.config.update({ region: 'eu-west-2' })

const secretsManager = new AWS.SecretsManager()

const createSecret = secretName => {
  secretsManager.createSecret(
    {
      Name: secretName,
      SecretString: JSON.stringify(require(REAPIT_CONFIG_IN_CWD_PATH)),
    },
    (err, data) => {
      if (err) {
        return console.error(err, err.stack)
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

    await prompts({
      type: 'text',
      name: 'value',
      message: 'Type "update" and hit <RETURN/ENTER> to confirm and submit your changes:',
      // eslint-disable-next-line
      validate: value => (value !== 'update' ? 'Invalid phrase' : true),
    })

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
    return console.log(err, err.stack)
  }
}

const getSecret = (secretName, reapitEnv = 'LOCAL', isGenerateConfigTsDef = false) => {
  secretsManager.getSecretValue(
    {
      SecretId: secretName,
    },
    (err, data) => {
      if (err) {
        handleFetchingSecretFail(err, isGenerateConfigTsDef)
      }

      try {
        const config = data.SecretString
        let parsedConfig = null
        parsedConfig = JSON.parse(config)
        const configMatchEnv = parsedConfig[reapitEnv]

        if (!configMatchEnv) {
          return console.log(`No config match ENV "${reapitEnv}"`)
        }

        if (isGenerateConfigTsDef) {
          generateConfigTsDef(config)
        }

        return writeConfigInCWD(JSON.stringify({ [reapitEnv]: configMatchEnv }))
      } catch (err) {
        console.log(
          'Something went wrong when parsing base configuration. Detailed error with stack trace is provided below:',
        )
        return console.log(err, err.stack)
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
        return console.error(err, err.stack)
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
        return console.log(err, err.stack)
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

module.exports = { getSecret, createSecret, updateSecret, deleteSecret, setEnv, getAllSecrets }
