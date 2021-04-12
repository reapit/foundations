import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PagedResultDepartmentModel_ } from '@reapit/foundations-ts-definitions'
import { URLS, BASE_HEADERS } from '@/constants/api'
import { getAllResource } from '@/util/api-helper'

export const getDepartments = async (
  session: ReapitConnectSession,
  criteria?: string,
): Promise<PagedResultDepartmentModel_ | undefined> => {
  let url = URLS.DEPARTMENTS

  if (criteria !== null || criteria !== '') {
    url = `${url}?${criteria}`
  }

  try {
    const response: PagedResultDepartmentModel_ | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('No response returned by API')
  } catch (err) {
    console.error('Error fetching Departments', err.message)
  }
}

export const getAllDepartments = async (session: ReapitConnectSession) => {
  return (await getAllResource(session, getDepartments, new URLSearchParams())).map(department => {
    const { id, name, typeOptions: propertyTypes } = department

    return {
      id,
      name,
      propertyTypes,
    }
  })
}
