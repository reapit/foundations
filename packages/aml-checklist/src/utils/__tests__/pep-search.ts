import { getPepSearchStatus, setPepSearchStatus, isCompletedPepSearch } from '../pep-search'
import { contact } from '@/sagas/__stubs__/contact'

describe('getPepSearchStatus', () => {
  it('should run correctly', async () => {
    const result = getPepSearchStatus()
    expect(result).toEqual(null)
  })
})

describe('setPepSearchStatus', () => {
  it('should run correctly', async () => {
    setPepSearchStatus({ id: 'test' })
    const result = getPepSearchStatus()
    expect(result).toEqual({ id: 'test' })
  })
})

describe('isCompletedPepSearch', () => {
  it('should run correctly', async () => {
    const result = isCompletedPepSearch(contact)
    expect(result).toBeFalsy()
  })
})
