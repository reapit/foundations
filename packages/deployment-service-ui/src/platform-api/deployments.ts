import { fetcher, notification } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import { BASE_HEADERS } from '../constants/api'

export const deploymentServiceCreate = async (
  session: ReapitConnectSession,
  deployment: Partial<DeploymentModelInterface>,
): Promise<DeploymentModelInterface | undefined> => {
  try {
    const response: DeploymentModelInterface | undefined = await fetcher({
      api: 'https://ayld62ixlf.execute-api.eu-west-2.amazonaws.com',
      url: '/dev/deployment',
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
      body: deployment,
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}

export const deploymentServicePaginate = async (
  session: ReapitConnectSession,
): Promise<DeploymentModelInterface[] | undefined> => {
  try {
    const response: { items: DeploymentModelInterface[] } | undefined = await fetcher({
      api: 'https://ayld62ixlf.execute-api.eu-west-2.amazonaws.com',
      url: '/dev/deployment',
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
    })

    if (response) {
      return response.items
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}

export const deploymentServiceDelete = async (
  session: ReapitConnectSession,
  id: string,
): Promise<DeploymentModelInterface | undefined> => {
  try {
    const response: DeploymentModelInterface | undefined = await fetcher({
      api: 'https://ayld62ixlf.execute-api.eu-west-2.amazonaws.com',
      url: `/dev/deployment/${id}`,
      method: 'DELETE',
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

export const deploymentServiceRun = async (
  session: ReapitConnectSession,
  id: string,
): Promise<DeploymentModelInterface | undefined> => {
  try {
    const response: DeploymentModelInterface | undefined = await fetcher({
      api: 'https://ayld62ixlf.execute-api.eu-west-2.amazonaws.com',
      url: `/dev/deployment/${id}/run`,
      method: 'POST',
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
    console.log(notification.error({ message: 'Deployment failed to run' }))
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}
