import { fetcher } from '@reapit/elements'
import { ReapitConnectSession } from '@reapit/connect-session'
import { BASE_HEADERS } from '@/constants/api'

/**
 * Helper function to retrieve all records of a resource by looping through the pages
 * @param {ReapitConnectSession} session
 * @param {any} resource
 * @param {URLSearchParams} criteria
 * @returns {array}
 */
export async function getAllResource(session: ReapitConnectSession, resource, criteria: URLSearchParams) {
  let url: string = ''
  let data: any = []

  // set the page size to the max to make as little requests as possible
  criteria.set('PageSize', '100')

  try {
    const initalResponse = await resource(session, criteria.toString())
    data = initalResponse._embedded

    // this means there are more pages to go through
    if (initalResponse._links.next !== undefined) {
      url = initalResponse._links.next.href

      // loop through until there is no longer a 'next' page
      do {
        // get the next page
        const response = await getNextPage(session, url)

        // add data to array
        data = [...data, ...response._embedded]

        // if there are no more pages, break loop
        if (response._links.next === undefined) {
          break
        }

        // assign url to the next page url
        url = response._links.next.href
      } while (url)
    }
  } catch (err) {
    throw new Error(`Failed to retrieve all pages: ${err.message}`)
  }

  return data
}

async function getNextPage(session: ReapitConnectSession, url: string) {
  const response = await fetcher({
    api: window.reapit.config.platformApiUrl,
    url,
    method: 'GET',
    headers: {
      ...BASE_HEADERS,
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  if (!response) {
    throw new Error('No response returned from the API')
  }

  return response
}
