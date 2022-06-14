import { AppDetailModel, AppRevisionModel, CreateAppRevisionModel } from '@reapit/foundations-ts-definitions'

export const checkShouldSendConsents = (
  app: AppDetailModel | null,
  createAppModel: CreateAppRevisionModel,
  hasInstallations: boolean,
): boolean => {
  const { isListed: isListedNew, scopes: newScopes } = createAppModel
  const isListedOld = app?.isListed
  const oldScopes = app?.scopes?.map((scope) => scope.name)
  const hasNewScopes = Boolean(newScopes?.filter((scope) => !oldScopes?.includes(scope)).length)

  return Boolean(isListedNew && isListedOld && hasNewScopes && hasInstallations)
}

export const checkShouldRenderConsents = (
  app: AppDetailModel | null,
  latestRevision: AppRevisionModel | null,
  hasInstallations: boolean,
): boolean => {
  const isListedNew = latestRevision?.isListed
  const newScopes = latestRevision?.scopes?.map((scope) => scope.name)
  const isListedOld = app?.isListed
  const oldScopes = app?.scopes?.map((scope) => scope.name)
  const hasNewScopes = Boolean(newScopes?.filter((scope) => !oldScopes?.includes(scope)).length)

  return Boolean(isListedNew && isListedOld && hasNewScopes && hasInstallations)
}
