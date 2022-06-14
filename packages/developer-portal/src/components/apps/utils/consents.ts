import { AppDetailModel, AppRevisionModel, CreateAppRevisionModel } from '@reapit/foundations-ts-definitions'

export const checkShouldSendConsents = (
  app: AppDetailModel | null,
  createAppModel: CreateAppRevisionModel,
): boolean => {
  const { isListed: isListedNew, scopes: newScopes } = createAppModel
  const isListedOld = app?.isListed
  const oldScopes = app?.scopes?.map((scope) => scope.name)
  const hasNewScopes = Boolean(newScopes?.filter((scope) => !oldScopes?.includes(scope)).length)
  console.log(isListedNew, isListedOld, hasNewScopes)
  return Boolean(isListedNew && isListedOld && hasNewScopes)
}

export const checkShouldRenderConsents = (
  app: AppDetailModel | null,
  latestRevision: AppRevisionModel | null,
): boolean => {
  const isListedNew = latestRevision?.isListed
  const newScopes = latestRevision?.scopes?.map((scope) => scope.name)
  const isListedOld = app?.isListed
  const oldScopes = app?.scopes?.map((scope) => scope.name)
  const hasNewScopes = Boolean(newScopes?.filter((scope) => !oldScopes?.includes(scope)).length)

  return Boolean(isListedNew && isListedOld && hasNewScopes)
}
