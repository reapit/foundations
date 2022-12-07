import * as React from 'react'
import { render } from '@testing-library/react'
import AppInstallationManager, {
  getInstallationsForWholeOrg,
  getInstallationsForOfficeGroups,
  getClientIdFirstPart,
  handleSetInstallTypes,
  WHOLE_ORG,
  SPECIFIC_OFFICE_GROUPS,
  handleOnCheckboxChange,
  handleModalConfirmation,
} from '../app-installation-manager'
import { mockAppDetail } from '../../../../services/__stubs__/apps'
import { bulkInstall } from '../../../../services/installation'

jest.mock('../../../../utils/use-org-id')
jest.mock('../../../../services/installation', () => ({
  bulkInstall: jest.fn(() => true),
  uninstallOrg: jest.fn(() => true),
  installOrg: jest.fn(() => true),
}))

const mockBulkInstall = bulkInstall as jest.Mock

const stubInstallations1 = [
  {
    client: 'OTHER',
    appId: 'FOO',
    id: 'BAR',
  },
  {
    client: 'SBOX',
    appId: 'FOO',
    id: 'BAR',
  },
]

const stubInstallations2 = [
  {
    client: 'SBOX-GWIT',
    appId: 'FOO',
    id: 'BAR',
  },
  {
    client: 'SBOX-OTHER',
    appId: 'FOO',
    id: 'BAR',
  },
  {
    client: 'SBOX',
    appId: 'FOO',
    id: 'BAR',
  },
]

const stubInstallations3 = [
  {
    client: 'OTHER',
    appId: 'FOO',
    id: 'BAR',
  },
  {
    client: 'SBOX-GWIT',
    appId: 'FOO',
    id: 'BAR',
  },
  {
    client: 'SBOX-OTHER',
    appId: 'FOO',
    id: 'BAR',
  },
  {
    client: 'SBOX-PWIT',
    appId: 'FOO',
    id: 'BAR',
  },
]

describe('AppInstallationManager', () => {
  it('should match a snapshot', () => {
    expect(render(<AppInstallationManager app={mockAppDetail} />)).toMatchSnapshot()
  })
})

describe('getInstallationsForWholeOrg', () => {
  it('should get the correct installations', () => {
    expect(getInstallationsForWholeOrg(stubInstallations1, 'SBOX', 'foo@bar.com')).toEqual([
      {
        body: {
          appId: 'FOO',
          terminatedBy: 'foo@bar.com',
          terminatedReason: 'Terminated from Marketplace Management App',
        },
        installationId: 'BAR',
      },
    ])
    expect(getInstallationsForWholeOrg(stubInstallations2, 'SBOX', 'foo@bar.com')).toEqual([
      {
        body: {
          appId: 'FOO',
          terminatedBy: 'foo@bar.com',
          terminatedReason: 'Terminated from Marketplace Management App',
        },
        installationId: 'BAR',
      },
    ])
    expect(getInstallationsForWholeOrg(stubInstallations3, 'SBOX', 'foo@bar.com')).toEqual([])
  })
})

describe('getInstallationsForOfficeGroups', () => {
  it('should get the correct installations', () => {
    expect(getInstallationsForOfficeGroups(stubInstallations1, 'SBOX')).toEqual([])
    expect(getInstallationsForOfficeGroups(stubInstallations2, 'SBOX')).toEqual(['SBOX-GWIT', 'SBOX-OTHER'])
    expect(getInstallationsForOfficeGroups(stubInstallations3, 'SBOX')).toEqual([
      'SBOX-GWIT',
      'SBOX-OTHER',
      'SBOX-PWIT',
    ])
  })
})

describe('getClientIdFirstPart', () => {
  it('should correctly get the first part of a client id', () => {
    expect(getClientIdFirstPart('SBOX')).toEqual('SBOX')
    expect(getClientIdFirstPart('SBOX-GWTI')).toEqual('SBOX')
    expect(getClientIdFirstPart('SBOX-OTHER')).toEqual('SBOX')
    expect(getClientIdFirstPart('OTHER')).toEqual('OTHER')
    expect(getClientIdFirstPart('OTHER-12')).toEqual('OTHER')
  })
})

describe('handleSetInstallTypes', () => {
  it('should correctly call setters if installing for whole org', () => {
    const orgClientId = 'SBOX'
    const email = 'test@test.com'
    const initialAppInstallationType = null
    const installations = stubInstallations1
    const setInitialAppInstallationType = jest.fn()
    const setAppInstallationType = jest.fn()
    const curried = handleSetInstallTypes(
      orgClientId,
      email,
      initialAppInstallationType,
      installations,
      setInitialAppInstallationType,
      setAppInstallationType,
    )
    curried()

    expect(setInitialAppInstallationType).toHaveBeenCalledWith(WHOLE_ORG)
    expect(setAppInstallationType).toHaveBeenCalledWith(WHOLE_ORG)
  })

  it('should correctly call setters if installing for groups', () => {
    const orgClientId = 'SBOX'
    const email = 'test@test.com'
    const initialAppInstallationType = null
    const installations = stubInstallations3
    const setInitialAppInstallationType = jest.fn()
    const setAppInstallationType = jest.fn()
    const curried = handleSetInstallTypes(
      orgClientId,
      email,
      initialAppInstallationType,
      installations,
      setInitialAppInstallationType,
      setAppInstallationType,
    )
    curried()

    expect(setInitialAppInstallationType).toHaveBeenCalledWith(SPECIFIC_OFFICE_GROUPS)
    expect(setAppInstallationType).toHaveBeenCalledWith(SPECIFIC_OFFICE_GROUPS)
  })
})

describe('handleOnCheckboxChange', () => {
  it('should correctly call setters', () => {
    const setAppInstallationType = jest.fn()
    const setOfficeGroupsToAdd = jest.fn()
    const setOfficeGroupsToRemove = jest.fn()
    const installType = WHOLE_ORG

    const curried = handleOnCheckboxChange(setAppInstallationType, setOfficeGroupsToAdd, setOfficeGroupsToRemove)

    curried(installType)

    expect(setAppInstallationType).toHaveBeenCalledWith(installType)
    expect(setOfficeGroupsToAdd).toHaveBeenCalledWith([])
    expect(setOfficeGroupsToRemove).toHaveBeenCalledWith([])
  })
})

describe('handleModalConfirmation', () => {
  it('should correctly call setters for a complete uninstall', async () => {
    const performCompleteUninstall = true
    const orgClientId = 'SBOX'
    const email = 'test@test.com'
    const installations = stubInstallations2
    const app = mockAppDetail
    const appInstallationType = 'WHOLE_ORG'
    const initialAppInstallationType = 'WHOLE_ORG'
    const officeGroupsToRemove = []
    const officeGroupsToAdd = []
    const setAppInstallationType = jest.fn()
    const setOfficeGroupsToAdd = jest.fn()
    const setOfficeGroupsToRemove = jest.fn()
    const setInitialAppInstallationType = jest.fn()
    const setPerformCompleteUninstall = jest.fn()
    const revalidateInstallations = jest.fn()
    const success = jest.fn()
    const closeModal = jest.fn()

    const curried = handleModalConfirmation(
      performCompleteUninstall,
      orgClientId,
      email,
      installations,
      app,
      appInstallationType,
      initialAppInstallationType,
      officeGroupsToRemove,
      officeGroupsToAdd,
      setAppInstallationType,
      setOfficeGroupsToAdd,
      setOfficeGroupsToRemove,
      setInitialAppInstallationType,
      setPerformCompleteUninstall,
      revalidateInstallations,
      success,
      closeModal,
    )

    await curried([{ allow: ['FOO'] }])

    expect(mockBulkInstall).toHaveBeenCalledWith([], ['SBOX-GWIT', 'SBOX-OTHER'], app.id, {
      metadata: [{ allow: ['FOO'] }],
    })
    expect(setAppInstallationType).toHaveBeenCalledWith(null)
    expect(setOfficeGroupsToAdd).toHaveBeenCalledWith([])
    expect(setOfficeGroupsToRemove).toHaveBeenCalledWith([])
    expect(setPerformCompleteUninstall).toHaveBeenCalledWith(false)
    expect(revalidateInstallations).toHaveBeenCalled()
    expect(success).toHaveBeenCalledWith('Changes have been saved successfully')
  })

  it('should correctly call setters for an install for the whole group', async () => {
    const performCompleteUninstall = false
    const orgClientId = 'SBOX'
    const email = 'test@test.com'
    const installations = stubInstallations2
    const app = mockAppDetail
    const appInstallationType = 'WHOLE_ORG'
    const initialAppInstallationType = 'WHOLE_ORG'
    const officeGroupsToRemove = []
    const officeGroupsToAdd = []
    const setAppInstallationType = jest.fn()
    const setOfficeGroupsToAdd = jest.fn()
    const setOfficeGroupsToRemove = jest.fn()
    const setInitialAppInstallationType = jest.fn()
    const setPerformCompleteUninstall = jest.fn()
    const revalidateInstallations = jest.fn()
    const success = jest.fn()
    const closeModal = jest.fn()

    const curried = handleModalConfirmation(
      performCompleteUninstall,
      orgClientId,
      email,
      installations,
      app,
      appInstallationType,
      initialAppInstallationType,
      officeGroupsToRemove,
      officeGroupsToAdd,
      setAppInstallationType,
      setOfficeGroupsToAdd,
      setOfficeGroupsToRemove,
      setInitialAppInstallationType,
      setPerformCompleteUninstall,
      revalidateInstallations,
      success,
      closeModal,
    )

    await curried([{ allow: ['FOO'] }])

    expect(mockBulkInstall).toHaveBeenCalledWith([], ['SBOX-GWIT', 'SBOX-OTHER'], app.id, {
      metadata: [{ allow: ['FOO'] }],
    })
    expect(setAppInstallationType).not.toHaveBeenCalled()
    expect(setOfficeGroupsToAdd).not.toHaveBeenCalled()
    expect(setOfficeGroupsToRemove).not.toHaveBeenCalled()
    expect(setPerformCompleteUninstall).not.toHaveBeenCalled()
    expect(setInitialAppInstallationType).toHaveBeenCalledWith(WHOLE_ORG)
    expect(revalidateInstallations).toHaveBeenCalled()
    expect(success).toHaveBeenCalledWith('Changes have been saved successfully')
  })

  it('should correctly call setters for an install for specific groups', async () => {
    const performCompleteUninstall = false
    const orgClientId = 'SBOX'
    const email = 'foo@bar.com'
    const installations = stubInstallations2
    const app = mockAppDetail
    const appInstallationType = 'SPECIFIC_OFFICE_GROUPS'
    const initialAppInstallationType = 'SPECIFIC_OFFICE_GROUPS'
    const officeGroupsToRemove = []
    const officeGroupsToAdd = []
    const setAppInstallationType = jest.fn()
    const setOfficeGroupsToAdd = jest.fn()
    const setOfficeGroupsToRemove = jest.fn()
    const setInitialAppInstallationType = jest.fn()
    const setPerformCompleteUninstall = jest.fn()
    const revalidateInstallations = jest.fn()
    const success = jest.fn()
    const closeModal = jest.fn()

    const curried = handleModalConfirmation(
      performCompleteUninstall,
      orgClientId,
      email,
      installations,
      app,
      appInstallationType,
      initialAppInstallationType,
      officeGroupsToRemove,
      officeGroupsToAdd,
      setAppInstallationType,
      setOfficeGroupsToAdd,
      setOfficeGroupsToRemove,
      setInitialAppInstallationType,
      setPerformCompleteUninstall,
      revalidateInstallations,
      success,
      closeModal,
    )

    await curried([{ allow: ['FOO'] }])

    expect(mockBulkInstall).toHaveBeenCalledWith([], ['SBOX-GWIT', 'SBOX-OTHER'], app.id, {
      metadata: [{ allow: ['FOO'] }],
    })
    expect(setAppInstallationType).not.toHaveBeenCalled()
    expect(setOfficeGroupsToAdd).toHaveBeenCalledWith([])
    expect(setOfficeGroupsToRemove).toHaveBeenCalledWith([])
    expect(setPerformCompleteUninstall).not.toHaveBeenCalled()
    expect(setInitialAppInstallationType).toHaveBeenCalledWith(SPECIFIC_OFFICE_GROUPS)
    expect(revalidateInstallations).toHaveBeenCalled()
    expect(success).toHaveBeenCalledWith('Changes have been saved successfully')
  })
})
