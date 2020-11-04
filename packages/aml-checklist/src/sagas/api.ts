import { fetcher } from '@reapit/elements'
import qs from 'query-string'
import { URLS } from '@/constants/api'
import {
  changeTimeZoneLocalForIdentityCheck,
  changeTimeZoneUTCForIdentityCheck,
  formatDateForContact,
} from '@/utils/datetime'
import { logger } from '@reapit/utils'
import { CONTACTS_PER_PAGE } from '@/constants/paginator'
import { cleanObject } from '@reapit/utils'

export const fetchChecklist = async ({ id, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${id}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: headers,
    })
    return response
  } catch (err) {
    logger(err)
    throw err
  }
}

export const fetchIdentityCheck = async ({ contactId, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.idChecks}?ContactId=${contactId}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: headers,
    })
    const newResponse = {
      ...response,
      _embedded: response?._embedded.map(identityCheck => {
        return changeTimeZoneLocalForIdentityCheck(identityCheck)
      }),
    }
    return newResponse?._embedded?.[0] || null
  } catch (err) {
    logger(err)
    throw err
  }
}

export const updateChecklist = async ({ contact, headers }) => {
  try {
    const formattedContact = formatDateForContact(contact)
    const { _eTag, ...otherData } = formattedContact
    const response = await fetcher({
      url: `${URLS.contacts}/${contact.id}`,
      api: window.reapit.config.platformApiUrl,
      method: 'PATCH',
      headers: {
        ...headers,
        'If-Match': _eTag,
      },
      body: otherData,
    })
    return response
  } catch (err) {
    logger(err)
    throw err
  }
}

export const uploadImage = async ({ name, imageData, headers }) => {
  // The fileuploader is not a Platform API. As such, api version header will throw if not deleted
  const headersWithoutVersion = {
    ...headers,
  }
  delete headersWithoutVersion['api-version']
  try {
    const response = await fetcher({
      url: URLS.fileUpload,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      headers: headersWithoutVersion,
      body: {
        name,
        imageData,
      },
    })
    return response
  } catch (err) {
    logger(err)
    throw err
  }
}

export const updateIdentityCheck = async ({ identityChecks, headers }) => {
  try {
    const { _eTag, ...otherData } = identityChecks
    const formatedIdentityChecks = changeTimeZoneUTCForIdentityCheck(otherData)
    const response = await fetcher({
      url: `${URLS.idChecks}/${identityChecks.id}`,
      api: window.reapit.config.platformApiUrl,
      method: 'PATCH',
      headers: {
        ...headers,
        'If-Match': _eTag,
      },
      body: formatedIdentityChecks,
    })
    return response
  } catch (err) {
    logger(err)
    throw err
  }
}

export const createIdentityCheck = async ({ identityChecks, headers }) => {
  try {
    const formatedIdentityChecks = changeTimeZoneUTCForIdentityCheck(identityChecks)
    const response = await fetcher({
      url: URLS.idChecks,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      headers: headers,
      body: formatedIdentityChecks,
    })
    return response
  } catch (err) {
    logger(err)
    throw err
  }
}

export const fetchContact = async ({ params, headers }) => {
  try {
    const cleanedParamsObject = cleanObject(params.data)
    const responseContacts = await fetcher({
      url: `${URLS.contacts}/?${qs.stringify({ ...cleanedParamsObject, pageSize: CONTACTS_PER_PAGE })}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers,
    })
    return responseContacts
  } catch (err) {
    logger(err)
    throw err
  }
}

export const fetchIdentityDocumentTypes = async ({ headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.configuration}/identityDocumentTypes`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: headers,
    })
    return response
  } catch (err) {
    logger(err)
    throw err
  }
}
