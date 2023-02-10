import { SecretsManager } from 'aws-sdk'
import { DeleteSecretResponse, GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager'
import { ClientConfigDto } from './dto'
import { v4 as uuid } from 'uuid'

const secretsmanager = new SecretsManager()

export const getConfig = (clientCode: string, configId: string): Promise<GetSecretValueResponse | null> => {
  const params = {
    SecretId: `Cloud/OpayoKey/${clientCode}/${configId}`,
  }

  return new Promise((resolve) => {
    secretsmanager.getSecretValue(params, (err, data) => {
      if (err) resolve(null)
      resolve(data)
    })
  })
}

export const createConfig = async (configDto: ClientConfigDto): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const configId = uuid()
    const { integrationKey, clientCode, passKey, vendorName } = configDto

    if (!integrationKey || !clientCode || !passKey || !vendorName) resolve(null)

    const params = {
      Description: 'Payments App Client Config For Opayo',
      Name: `Cloud/OpayoKey/${clientCode}/${configId}`,
      SecretString: JSON.stringify({
        integrationKey,
        passKey,
        vendorName,
      }),
    }

    secretsmanager.createSecret(params, (err) => {
      if (err) reject(err)
      resolve(configId)
    })
  })
}

export const updateConfig = async (configDto: ClientConfigDto): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const { integrationKey, clientCode, passKey, vendorName, configId } = configDto

    if (!integrationKey || !clientCode || !passKey || !vendorName) {
      if (configId) resolve(configId)
      resolve(null)
    }

    const params = {
      SecretId: `Cloud/OpayoKey/${clientCode}/${configId}`,
      SecretString: JSON.stringify({
        integrationKey,
        passKey,
        vendorName,
      }),
    }

    secretsmanager.updateSecret(params, (err) => {
      if (err) reject(err)
      resolve(configId)
    })
  })
}

export const deleteConfig = (clientCode: string, configId?: string): Promise<DeleteSecretResponse | null> => {
  const params = {
    SecretId: `Cloud/OpayoKey/${clientCode}/${configId}`,
  }

  return new Promise((resolve) => {
    if (!clientCode || !configId) resolve(null)

    secretsmanager.deleteSecret(params, (err, data) => {
      if (err) resolve(null)
      resolve(data)
    })
  })
}
