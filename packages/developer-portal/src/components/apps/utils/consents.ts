import { AppDetailModel, AppRevisionModel, CreateAppRevisionModel } from '@reapit/foundations-ts-definitions'

export const checkShouldSendConsents = (app: AppDetailModel | null, createAppModel: CreateAppRevisionModel) => {
  const { isListed: isListedNew, scopes: newScopes } = createAppModel
  const isListedOld = app?.isListed
  const oldScopes = app?.scopes?.map((scope) => scope.name)
  const hasNewScopes = Boolean(newScopes?.filter((scope) => !oldScopes?.includes(scope)).length)

  return isListedNew && isListedOld && hasNewScopes
}

export const checkShouldRenderConsents = (app: AppDetailModel | null, latestRevision: AppRevisionModel | null) => {
  const isListedNew = latestRevision?.isListed
  const newScopes = latestRevision?.scopes?.map((scope) => scope.name)
  const isListedOld = app?.isListed
  const oldScopes = app?.scopes?.map((scope) => scope.name)
  const hasNewScopes = Boolean(newScopes?.filter((scope) => !oldScopes?.includes(scope)).length)

  return isListedNew && isListedOld && hasNewScopes
}
