const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({ region: 'eu-west-2' })

const secretsManager = new AWS.SecretsManager()

const createSecret = secretName => {
  secretsManager.createSecret(
    {
      Name: secretName,
      SecretString: JSON.stringify(require(`${__dirname}/reapit-config.json`))
    },
    (err, data) => {
      if (err) {
        return console.error(err, err.stack)
      }
      return console.log('Successfully created secret', data)
    }
  )
}

const updateSecret = secretName => {
  secretsManager.updateSecret(
    {
      SecretId: secretName,
      SecretString: JSON.stringify(require(`${__dirname}/reapit-config.json`))
    },
    (err, data) => {
      if (err) {
        return console.error(err, err.stack)
      }
      return console.log('Successfully updated secret', data)
    }
  )
}

const getSecret = secretName => {
  secretsManager.getSecretValue(
    {
      SecretId: secretName
    },
    (err, data) => {
      if (err) {
        return console.log(err, err.stack)
      }

      return fs.writeFile(
        'reapit-config.json',
        data.SecretString,
        'utf8',
        err => {
          if (err) {
            console.error(
              'An error occured while writing JSON Object to File.',
              err
            )
            return console.error(err)
          }

          console.log(
            'reapit-config.json has been saved - be sure to add to your .gitignore file'
          )
        }
      )
    }
  )
}

const deleteSecret = secretName => {
  secretsManager.deleteSecret(
    {
      RecoveryWindowInDays: 7,
      SecretId: secretName
    },
    (err, data) => {
      if (err) {
        return console.error(err, err.stack)
      }
      return console.log('Successfully deleted secret', data)
    }
  )
}

module.exports = { getSecret, createSecret, updateSecret, deleteSecret }
