import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockDeveloperModelPagedResult } from '../../../tests/__stubs__/developers'

import {
  handleOpenModal,
  handleDevIdMembers,
  handleDevIdApps,
  handleToggleDevEdition,
  DevelopersTable,
  handleDevIdSubs,
} from '../developers-table'

jest.mock('../../../core/use-permissions-state')

describe('DevelopersTable', () => {
  it('should render component with no developers', () => {
    expect(render(<DevelopersTable developers={null} refreshDevelopers={jest.fn()} />)).toMatchSnapshot()
  })
  it('should render component with developers', () => {
    expect(
      render(<DevelopersTable developers={mockDeveloperModelPagedResult} refreshDevelopers={jest.fn()} />),
    ).toMatchSnapshot()
  })
})

describe('handleOpenModal', () => {
  it('handleOpenModal should set developer and open modal', () => {
    const openModal = jest.fn()
    const setDeveloperUpdate = jest.fn()
    const developer = mockDeveloperModelPagedResult.data as DeveloperModel[][0]
    const curried = handleOpenModal(openModal, setDeveloperUpdate, developer)

    curried()

    expect(setDeveloperUpdate).toHaveBeenCalledWith(developer)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleDevIdMembers', () => {
  it('handleDevIdMembers should correctly set the dev id', () => {
    const setDevIdMembers = jest.fn()
    const setDevIdSubs = jest.fn()
    const setDevIdApps = jest.fn()
    const devIdMembers = 'MOCK_ID'
    const curried = handleDevIdMembers(setDevIdMembers, setDevIdSubs, setDevIdApps, devIdMembers)

    curried()

    expect(setDevIdMembers).toHaveBeenCalledWith(devIdMembers)
    expect(setDevIdApps).toHaveBeenCalledWith(null)
    expect(setDevIdSubs).toHaveBeenCalledWith(null)
  })
})

describe('handleDevIdApps', () => {
  it('handleDevIdApps should correctly set the dev id', () => {
    const setDevIdApps = jest.fn()
    const setDevIdSubs = jest.fn()
    const setDevIdMembers = jest.fn()
    const devIdApps = 'MOCK_ID'
    const curried = handleDevIdApps(setDevIdApps, setDevIdSubs, setDevIdMembers, devIdApps)

    curried()

    expect(setDevIdApps).toHaveBeenCalledWith(devIdApps)
    expect(setDevIdMembers).toHaveBeenCalledWith(null)
    expect(setDevIdSubs).toHaveBeenCalledWith(null)
  })
})

describe('handleDevIdSubs', () => {
  it('handleDevIdSubs should correctly set the dev id', () => {
    const setDevIdSubs = jest.fn()
    const setDevIdApps = jest.fn()
    const setDevIdMembers = jest.fn()
    const devIdSubs = 'MOCK_ID'
    const curried = handleDevIdSubs(setDevIdSubs, setDevIdApps, setDevIdMembers, devIdSubs)

    curried()

    expect(setDevIdSubs).toHaveBeenCalledWith(devIdSubs)
    expect(setDevIdMembers).toHaveBeenCalledWith(null)
    expect(setDevIdApps).toHaveBeenCalledWith(null)
  })
})

describe('handleToggleDevEdition', () => {
  it('handleToggleDevEdition should correctly set the dev edition status if pays for currently', async () => {
    const developer = mockDeveloperModelPagedResult.data as DeveloperModel[][0]
    const updateDeveloper = jest.fn(() => Promise.resolve(true))
    const refreshDevelopers = jest.fn()
    const paysDeveloperEdition = true
    const curried = handleToggleDevEdition(developer, updateDeveloper, refreshDevelopers, paysDeveloperEdition)

    curried()

    await Promise.resolve()

    expect(updateDeveloper).toHaveBeenCalledWith(
      { ...developer, companyName: developer.company, developerEditionSubscriptionCost: 0.0 },
      { uriParams: { developerId: developer?.id } },
    )

    expect(refreshDevelopers).toHaveBeenCalledTimes(1)
  })

  it('handleToggleDevEdition should correctly set the dev edition status if does not pay for currently', async () => {
    const developer = mockDeveloperModelPagedResult.data as DeveloperModel[][0]
    const updateDeveloper = jest.fn(() => Promise.resolve(true))
    const refreshDevelopers = jest.fn()
    const paysDeveloperEdition = false
    const curried = handleToggleDevEdition(developer, updateDeveloper, refreshDevelopers, paysDeveloperEdition)

    curried()

    await Promise.resolve()

    expect(updateDeveloper).toHaveBeenCalledWith(
      { ...developer, companyName: developer.company, developerEditionSubscriptionCost: 300.0 },
      { uriParams: { developerId: developer?.id } },
    )

    expect(refreshDevelopers).toHaveBeenCalledTimes(1)
  })
})
