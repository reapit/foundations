import { ContactModel } from '@/types/contact-api-schema'

const REAPIT_PEP_SEARCH_STATUS = 'reapitPepSearchStatus'

export const getPepSearchStatus = () => {
  try {
    const statusJSON = window.localStorage.getItem(REAPIT_PEP_SEARCH_STATUS)
    if (statusJSON) {
      return JSON.parse(statusJSON)
    }
    return null
  } catch (err) {
    console.error('ERROR GETTING PEP SEARCH STATUS', err.message)
    return null
  }
}

export const setPepSearchStatus = (pepSearchStatus: any) => {
  try {
    const statusJSON = JSON.stringify(pepSearchStatus)
    window.localStorage.setItem(REAPIT_PEP_SEARCH_STATUS, statusJSON)
  } catch (err) {
    console.error('ERROR SETTING PEP SEARCH STATUS', err.message)
  }
}

export const isCompletedPepSearch = (contact: ContactModel) => {
  if (!contact) {
    return false
  }
  const pepSearchStatus = getPepSearchStatus() || {}

  const { id } = contact

  if (id) {
    if (pepSearchStatus[id]) {
      return pepSearchStatus[id] === 'passed' || pepSearchStatus[id] === 'failed'
    }
    pepSearchStatus[id] = 'uncompleted'
    setPepSearchStatus(pepSearchStatus)
  }

  return false
}

export const handlePepSearchStatus = (contactId: string, type: string) => {
  if (!contactId) {
    return
  }

  const pepSearchStatus = getPepSearchStatus() || {}
  pepSearchStatus[contactId] = type
  setPepSearchStatus(pepSearchStatus)
}
