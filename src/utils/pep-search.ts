import { ContactModel } from '@reapit/types'
import dayjs from 'dayjs'

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
    if (pepSearchStatus[id] && pepSearchStatus[id].status) {
      return pepSearchStatus[id].status === 'passed' || pepSearchStatus[id].status === 'failed'
    }
    pepSearchStatus[id] = { status: 'uncompleted' }

    setPepSearchStatus(pepSearchStatus)
  }

  return false
}

export const handlePepSearchStatus = ({ id, param, result }) => {
  if (!id) {
    return
  }
  const pepSearchStatus = getPepSearchStatus() || {}
  const status = result ? 'passed' : 'failed'
  pepSearchStatus[id] = { status, param, result, time: dayjs().format('DD MMMM YY HH:mmA') }
  setPepSearchStatus(pepSearchStatus)
}
