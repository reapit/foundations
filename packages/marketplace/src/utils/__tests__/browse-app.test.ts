import { ReapitConnectSession } from '@reapit/connect-session'
import { AppDetailModel, AppSummaryModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { COGNITO_GROUP_ORGANISATION_ADMIN } from '../auth'
import { filterRestrictedAppDetail, filterRestrictedAppsList } from '../browse-app'

describe('filterRestrictedAppsList', () => {
  it('should correctly filter apps if user is not an admin and appId is in orgAdminRestrictedAppIds', () => {
    process.env.orgAdminRestrictedAppIds = ['ID_IN_CONFIG']
    process.env.clientHiddenAppIds = {}
    const idInConfig = 'ID_IN_CONFIG'
    const idNotInConfig = 'ID_NOT_IN_CONFIG'
    const stubApps = {
      data: [
        {
          id: idInConfig,
        },
        { id: idNotInConfig },
      ],
    }
    const stubSession = {
      loginIdentity: {
        clientId: 'SBOX',
        groups: [] as string[],
      },
    } as ReapitConnectSession
    const curried = filterRestrictedAppsList(stubApps, stubSession)

    const result = curried() as AppSummaryModelPagedResult

    expect(result.data?.length).toBe(1)
    expect((result?.data as AppSummaryModel[])[0].id).toEqual(idNotInConfig)
  })

  it('should correctly not filter apps if user is  an admin and appId is in orgAdminRestrictedAppIds', () => {
    process.env.orgAdminRestrictedAppIds = ['ID_IN_CONFIG']
    process.env.clientHiddenAppIds = {}

    const idInConfig = 'ID_IN_CONFIG'
    const idNotInConfig = 'ID_NOT_IN_CONFIG'
    const stubApps = {
      data: [
        {
          id: idInConfig,
        },
        { id: idNotInConfig },
      ],
    }
    const stubSession = {
      loginIdentity: {
        clientId: 'SBOX',
        groups: [COGNITO_GROUP_ORGANISATION_ADMIN] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppsList(stubApps, stubSession)

    const result = curried() as AppSummaryModelPagedResult

    expect(result.data?.length).toBe(2)
    expect((result?.data as AppSummaryModel[])[0].id).toEqual(idInConfig)
  })

  xit('should correctly filter apps if appId is in clientHiddenAppIds', () => {
    process.env.orgAdminRestrictedAppIds = []
    process.env.clientHiddenAppIds = { SBOX: ['ID_IN_CONFIG'] }

    const idInConfig = 'ID_IN_CONFIG'
    const idNotInConfig = 'ID_NOT_IN_CONFIG'
    const stubApps = {
      data: [
        {
          id: idInConfig,
        },
        { id: idNotInConfig },
      ],
    }
    const stubSession = {
      loginIdentity: {
        clientId: 'SBOX',
        groups: [] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppsList(stubApps, stubSession)

    const result = curried() as AppSummaryModelPagedResult

    expect(result.data?.length).toBe(1)
    expect((result?.data as AppSummaryModel[])[0].id).toEqual(idNotInConfig)
  })

  it('should correctly not filter apps if appId is not in clientHiddenAppIds', () => {
    process.env.orgAdminRestrictedAppIds = []
    process.env.clientHiddenAppIds = { SBOX: ['ID_NOT_IN_CONFIG'] }
    const idInConfig = 'ID_IN_CONFIG'
    const idAlsoInConfig = 'ID_ALSO_IN_CONFIG'
    const stubApps = {
      data: [
        {
          id: idInConfig,
        },
        { id: idAlsoInConfig },
      ],
    }
    const stubSession = {
      loginIdentity: {
        clientId: 'SBOX',
        groups: [] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppsList(stubApps, stubSession)

    const result = curried() as AppSummaryModelPagedResult

    expect(result.data?.length).toBe(2)
    expect((result?.data as AppSummaryModel[])[0].id).toEqual(idInConfig)
  })

  it('should correctly not filter apps if data is undefined', () => {
    process.env.clientHiddenAppIds = {}
    process.env.orgAdminRestrictedAppIds = ['ID_IN_CONFIG']
    const stubApps = {}
    const stubSession = {
      loginIdentity: {
        groups: [] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppsList(stubApps, stubSession)

    const result = curried() as AppSummaryModelPagedResult

    expect(result).toBeNull()
  })
})

describe('filterRestrictedAppDetail', () => {
  it('should correctly filter app if user is not an admin and appId is in orgAdminRestrictedAppIds', () => {
    process.env.orgAdminRestrictedAppIds = ['ID_IN_CONFIG']
    process.env.clientHiddenAppIds = {}
    const idInConfig = 'ID_IN_CONFIG'
    const stubApp = {
      id: idInConfig,
    }
    const stubSession = {
      loginIdentity: {
        clientId: 'SBOX',
        groups: [] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppDetail(stubApp, stubSession)

    const result = curried() as AppDetailModel

    expect(result).toBeNull()
  })

  it('should correctly not filter apps if user is an admin and appId is in orgAdminRestrictedAppIds', () => {
    process.env.orgAdminRestrictedAppIds = ['ID_IN_CONFIG']
    process.env.clientHiddenAppIds = {}
    const idNotInConfig = 'ID_NOT_IN_CONFIG'
    const stubApp = {
      id: idNotInConfig,
    }
    const stubSession = {
      loginIdentity: {
        clientId: 'SBOX',
        groups: [COGNITO_GROUP_ORGANISATION_ADMIN] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppDetail(stubApp, stubSession)

    const result = curried() as AppDetailModel

    expect(result?.id).toEqual(idNotInConfig)
  })

  xit('should correctly filter apps if appId is in clientHiddenAppIds', () => {
    process.env.orgAdminRestrictedAppIds = []
    process.env.clientHiddenAppIds = { SBOX: ['ID_IN_CONFIG'] }
    const idInConfig = 'ID_IN_CONFIG'
    const stubApp = {
      id: idInConfig,
    }
    const stubSession = {
      loginIdentity: {
        clientId: 'SBOX',
        groups: [] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppDetail(stubApp, stubSession)

    const result = curried() as AppDetailModel

    expect(result).toBeNull()
  })

  it('should correctly not filter apps if appId is not in clientHiddenAppIds', () => {
    process.env.orgAdminRestrictedAppIds = []
    process.env.clientHiddenAppIds = { SBOX: ['ID_IN_CONFIG'] }
    const idNotInConfig = 'ID_NOT_IN_CONFIG'
    const stubApp = {
      id: idNotInConfig,
    }
    const stubSession = {
      loginIdentity: {
        clientId: 'SBOX',
        groups: [] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppDetail(stubApp, stubSession)

    const result = curried() as AppDetailModel

    expect(result?.id).toEqual(idNotInConfig)
  })

  it('should correctly not filter apps if app is null', () => {
    process.env.orgAdminRestrictedAppIds = []
    process.env.orgAdminRestrictedAppIds = ['ID_IN_CONFIG']
    const stubApp = null
    const stubSession = {
      loginIdentity: {
        groups: [] as string[],
      },
    } as ReapitConnectSession

    const curried = filterRestrictedAppDetail(stubApp, stubSession)

    const result = curried() as AppDetailModel

    expect(result).toBeNull()
  })
})
