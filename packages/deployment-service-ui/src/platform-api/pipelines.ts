import { fetcher, notification } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { BASE_HEADERS } from '../constants/api'

export const pipelineServiceCreate = async (
  session: ReapitConnectSession,
  pipeline: Partial<PipelineModelInterface>,
): Promise<PipelineModelInterface | undefined> => {
  try {
    const response: PipelineModelInterface | undefined = await fetcher({
      api: 'https://h2r8e8wbd4.execute-api.eu-west-2.amazonaws.com',
      url: '/dev/pipeline',
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
      body: pipeline,
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}

export const pipelineServicePaginate = async (
  session: ReapitConnectSession,
): Promise<PipelineModelInterface[] | undefined> => {
  try {
    const response: { items: PipelineModelInterface[] } | undefined = await fetcher({
      api: 'https://h2r8e8wbd4.execute-api.eu-west-2.amazonaws.com',
      url: '/dev/pipeline',
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

export const pipelineServiceDelete = async (
  session: ReapitConnectSession,
  id: string,
): Promise<PipelineModelInterface | undefined> => {
  try {
    const response: PipelineModelInterface | undefined = await fetcher({
      api: 'https://h2r8e8wbd4.execute-api.eu-west-2.amazonaws.com',
      url: `/dev/pipeline/${id}`,
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

export const pipelineServiceRun = async (
  session: ReapitConnectSession,
  id: string,
): Promise<PipelineModelInterface | undefined> => {
  try {
    const response: PipelineModelInterface | undefined = await fetcher({
      api: 'https://h2r8e8wbd4.execute-api.eu-west-2.amazonaws.com',
      url: `/dev/pipeline/${id}/run`,
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
    console.log(notification.error({ message: 'Pipeline failed to run' }))
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}
