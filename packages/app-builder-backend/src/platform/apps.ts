import fetch from 'node-fetch'
import config from '../config.json'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'

const { platformApiUrl } = config

export const getDeveloperApps = async (developerId: string, accessToken: string) => {
  const res = await fetch(`${platformApiUrl}/marketplace/apps?PageSize=100&developerId=${developerId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': '2020-01-31',
    },
  })
  const data: AppSummaryModelPagedResult = await res.json()

  return data.data
}
