import { BASE_HEADERS, URLS } from './../constants/api'
import { ReapitConnectSession } from '@reapit/connect-session'
import { fetcher } from '@reapit/elements-legacy'
import { Pagination } from 'nestjs-typeorm-paginate'

export const releaseServicePaginate = async (
  session: ReapitConnectSession,
  projectName: string,
): Promise<Pagination<any> | undefined> => {
  try {
    const response: Pagination<any> | undefined = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: `/deploy/release/${projectName}`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}

export const releaseServiceProjectPaginate = async (
  session: ReapitConnectSession,
): Promise<Pagination<any> | undefined> => {
  try {
    const response: Pagination<any> | undefined = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: '/deploy/project/',
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}

export const releaseVersionDeploy = async (
  session: ReapitConnectSession,
  projectName: string,
  version: string,
): Promise<void> => {
  try {
    await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: `/deploy/version/${projectName}/${version}`,
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
    })
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}
