import React from 'react'
import { handleUpdateDevStatus, handleRefreshDevelopers, DeveloperStatusModal } from '../developer-status-modal'
import { render } from '../../../tests/react-testing'
import { mockDeveloperModelPagedResult } from '../../../tests/__stubs__/developers'
import { Marketplace } from '@reapit/foundations-ts-definitions'

const developer = mockDeveloperModelPagedResult.data as Marketplace.DeveloperModel[][0]

describe('DeveloperStatusModal', () => {
  it('should render component with no developer', () => {
    expect(
      render(
        <DeveloperStatusModal
          developer={null}
          setDeveloperUpdate={jest.fn()}
          closeModal={jest.fn()}
          refreshDevelopers={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
  it('should render component with a developer', () => {
    expect(
      render(
        <DeveloperStatusModal
          developer={developer}
          setDeveloperUpdate={jest.fn()}
          closeModal={jest.fn()}
          refreshDevelopers={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleUpdateDevStatus', () => {
  it('handleUpdateDevStatus should correctly update dev status', () => {
    const updateDeveloperStatus = jest.fn()
    const updateDeveloperModel = developer
    const curried = handleUpdateDevStatus(updateDeveloperStatus, updateDeveloperModel)
    const formValues = { status: 'confirmed', reapitReference: 'MOCK_REF' }

    curried(formValues)

    expect(updateDeveloperStatus).toHaveBeenCalledWith({
      ...updateDeveloperModel,
      companyName: updateDeveloperModel.company,
      ...formValues,
    })
  })
})

describe('handleRefreshDevelopers', () => {
  it('handleRefreshDevelopers should correctly refresh developers', () => {
    const refreshDevelopers = jest.fn()
    const setDeveloperUpdate = jest.fn()
    const closeModal = jest.fn()
    const developerUpdated = true
    const curried = handleRefreshDevelopers(refreshDevelopers, setDeveloperUpdate, closeModal, developerUpdated)

    curried()

    expect(refreshDevelopers).toHaveBeenCalledTimes(1)
    expect(setDeveloperUpdate).toHaveBeenCalledWith(null)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
