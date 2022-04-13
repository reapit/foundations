import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { fetcher } from '@reapit/utils-common'
import { logger } from '@reapit/utils-react'

export const createDeveloperService = async (developer: CreateDeveloperModel) => {
  try {
    const response = await fetcher({
      url: '/marketplace/developers',
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-version': 'latest',
      },
      body: developer,
    })

    if (response) {
      return true
    }
  } catch (err: any) {
    logger(err as Error)
    return err?.response?.description ?? ''
  }
}
