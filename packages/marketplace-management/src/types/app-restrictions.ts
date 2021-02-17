export interface AppRestriction {
  appId: string
  status: 'exclude' | 'include'
}

export interface AppRestrictionPaged {
  data: AppRestriction[]
}
