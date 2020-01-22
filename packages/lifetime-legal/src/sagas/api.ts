import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from '@/constants/api'
import { changeTimeZoneUTCForIdentityCheck, changeTimeZoneLocalForIdentityCheck } from '@/utils/datetime'
import { CONTACTS_PER_PAGE } from '@/constants/paginator'

export const fetchContact = async ({ contactId, headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${contactId}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers: headers
    })
    return response
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

export const fetchContacts = async ({ headers, params }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/?${setQueryParams({ ...params.data, pageSize: CONTACTS_PER_PAGE })}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers: headers
    })
    return response
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const updateContact = async ({ contactId, headers, contact }) => {
  try {
    const response = await fetcher({
      url: `${URLS.contacts}/${contactId}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'PATCH',
      headers: headers,
      body: contact
    })
    return response
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

export const uploadImage = async ({ name, imageData, headers }) => {
  try {
    const responseUploadImage = await fetcher({
      url: '/',
      api: process.env.UPLOAD_FILE_BASE_URL as string,
      method: 'POST',
      headers: headers,
      body: {
        name,
        imageData
      }
    })
    return responseUploadImage
  } catch (err) {
    console.error(err.message)
    throw new Error(err)
  }
}

export const fetchIdentityCheck = async ({ headers, contactId }) => {
  try {
    const response = await fetcher({
      url: `${URLS.idChecks}?ContactId=${contactId}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers: headers
    })
    const newResponse = {
      ...response,
      _embedded: response?._embedded.map(identityCheck => {
        return changeTimeZoneLocalForIdentityCheck(identityCheck)
      })
    }
    return newResponse?._embedded?.[0] || null
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

export const updateIdentityCheck = async ({ identityChecks, headers }) => {
  const newIdentityChecks = changeTimeZoneUTCForIdentityCheck(identityChecks)
  try {
    const response = await fetcher({
      url: `${URLS.idChecks}/${identityChecks.id}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'PATCH',
      headers: headers,
      body: newIdentityChecks
    })
    return response
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

export const createIdentityCheck = async ({ identityChecks, headers }) => {
  const newIdentityChecks = changeTimeZoneUTCForIdentityCheck(identityChecks)
  try {
    const response = await fetcher({
      url: URLS.idChecks,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'POST',
      headers: headers,
      body: newIdentityChecks
    })
    return response
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

export const fetchIdentityDocumentTypes = async ({ headers }) => {
  try {
    const response = await fetcher({
      url: `${URLS.configuration}/identityDocumentTypes`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers: headers
    })
    return response
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

export const fetchIdentitiesCheck = async ({ headers, listContactId }) => {
  try {
    const response = await fetcher({
      url: `${URLS.idChecks}/?${setQueryParams({ ContactId: [...listContactId] })}`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers
    })
    return response
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}
