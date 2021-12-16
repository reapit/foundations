import { fetcher, notification } from '@reapit/elements-legacy'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { BASE_HEADERS, URLS } from '../constants/api'
import { Pagination } from 'nestjs-typeorm-paginate'

export const pipelineServiceCreate = async (
  session: ReapitConnectSession,
  pipeline: Partial<PipelineModelInterface>,
): Promise<PipelineModelInterface | undefined> => {
  try {
    const response: PipelineModelInterface | undefined = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: '/pipeline',
      method: 'POST',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
      body: {
        ...pipeline,
        appType: 'react',
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

export const pipelineServiceGet = async (
  session: ReapitConnectSession,
  pipelineId: string,
): Promise<PipelineModelInterface | undefined> => {
  try {
    const response: PipelineModelInterface | undefined = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: `/pipeline/${pipelineId}`,
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

export const pipelineServicePaginate = async (
  session: ReapitConnectSession,
  page: number = 1,
): Promise<Pagination<PipelineModelInterface> | undefined> => {
  try {
    const response: Pagination<PipelineModelInterface> = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: `/pipeline?page=${page}`,
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

export const pipelineServiceDelete = async (
  session: ReapitConnectSession,
  id: string,
): Promise<PipelineModelInterface | undefined> => {
  try {
    const response: PipelineModelInterface | undefined = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: `/pipeline/${id}`,
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

export const pipelineRunnerPaginate = async (
  session: ReapitConnectSession,
  pipeline: PipelineModelInterface,
): Promise<Pagination<PipelineRunnerModelInterface> | undefined> => {
  try {
    const response: Pagination<PipelineRunnerModelInterface> | undefined = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: `/pipeline/${pipeline.id}/pipeline-runner`,
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
    console.log(notification.error({ message: 'Pipeline failed to run' }))
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}

export const pipelineRunnerCreate = async (
  session: ReapitConnectSession,
  pipeline: PipelineModelInterface,
): Promise<PipelineRunnerModelInterface | undefined> => {
  try {
    const response: PipelineRunnerModelInterface = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: `/pipeline/${pipeline.id}/pipeline-runner`,
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
  } catch (err: any) {
    console.log(notification.error({ message: err?.response?.message || 'Pipeline failed to run' }))
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}

export const pipelineServiceUpdate = async (
  session: ReapitConnectSession,
  pipeline: PipelineModelInterface,
): Promise<PipelineRunnerModelInterface | undefined> => {
  try {
    const response: PipelineRunnerModelInterface = await fetcher({
      api: URLS.DEPLOYMENT_SERVICE_HOST,
      url: `/pipeline/${pipeline.id}`,
      method: 'PUT',
      headers: {
        ...BASE_HEADERS,
        Authorization: `${session.idToken}`,
      },
      body: pipeline,
    })

    if (response) {
      notification.success({ message: 'Pipeline updated' })
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.log(notification.error({ message: 'Pipeline failed to update' }))
    console.error('Error fetching Configuration Appointment Types', err.message)
  }
}
