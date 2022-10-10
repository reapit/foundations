import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockDataSets } from '../../../tests/__stubs__/data-sets'
import DataSetsTable, { handleCreateRequest } from '../data-sets-table'
import { ReapitConnectSession } from '@reapit/connect-session'

describe('DataSetsTable', () => {
  it('should match a snapshot', () => {
    expect(render(<DataSetsTable dataSets={mockDataSets._embedded} refreshShares={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleCreateRequest', () => {
  it('should create an account successfully', async () => {
    const createShare = jest.fn(() => Promise.resolve(true))
    const refreshShares = jest.fn()
    const connectSession = {
      loginIdentity: {
        orgId: 'MOCK_ID',
        email: 'MOCK_EMAIL',
        name: 'MOCK_NAME',
        agencyCloudId: 'MOCK_ID',
      },
    } as unknown as ReapitConnectSession
    const datasetId = 'MOCK_ID'

    const curried = handleCreateRequest(createShare, refreshShares, connectSession, datasetId)

    await curried()

    expect(createShare).toHaveBeenCalledWith({
      organisationId: connectSession.loginIdentity.orgId,
      requesterEmail: connectSession.loginIdentity.email,
      requesterName: connectSession.loginIdentity.name,
      requestMessage: 'Please can I access this data',
      datasetId,
      customerId: connectSession.loginIdentity.agencyCloudId,
      devMode: false,
    })

    expect(refreshShares).toHaveBeenCalledTimes(1)
  })
})
