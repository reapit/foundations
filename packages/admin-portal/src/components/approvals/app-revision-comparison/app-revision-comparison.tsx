import React, { FC } from 'react'
import {
  AppRevisionModel,
  MediaModel,
  ScopeModel,
  AppDetailModel,
  DesktopIntegrationTypeModel,
  DesktopIntegrationTypeModelPagedResult,
  ApprovalModel,
} from '@reapit/foundations-ts-definitions'
import DiffMedia from '../diff-media'
import DiffCheckbox from '../diff-checkbox'
import DiffViewer from '../diff-viewer'
import DiffRenderHTML from '../diff-render-html'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { BodyText, elMb11, elMb5, Loader, PersistentNotification } from '@reapit/elements'

export type AppRevisionComparisonProps = {
  approval: ApprovalModel | null
}

export type DiffMediaModel = {
  currentMedia?: string
  changedMedia?: string
  order: number
  type: string
}

const diffStringList: { [k in keyof AppRevisionModel]: string } = {
  name: 'Name',
  category: 'Category',
  homePage: 'Home page',
  launchUri: 'Launch URI',
  supportEmail: 'Support Email',
  telephone: 'Telephone',
  summary: 'Summary',
  description: 'Description',
  redirectUris: 'Redirect URIs',
  signoutUris: 'Signout URIs',
  limitToClientIds: 'Private Apps',
  desktopIntegrationTypeIds: 'Integration Type',
  privacyPolicyUrl: 'Privacy Policy',
  termsAndConditionsUrl: 'Terms & Conditions',
  pricingUrl: 'Pricing Info',
}

export const isAppearInScope = (nameNeedToFind: string | undefined, scopes: ScopeModel[] = []): boolean => {
  if (!nameNeedToFind || !scopes?.length) {
    return false
  }
  const result = scopes.find((item: ScopeModel) => {
    return item.name === nameNeedToFind
  })
  return !!result
}

export const renderCheckboxesDiff = ({
  scopes,
  appScopes,
  revisionScopes,
}: {
  scopes: ScopeModel[]
  appScopes: ScopeModel[] | undefined
  revisionScopes: ScopeModel[] | undefined
}) => {
  return scopes.map((scope: ScopeModel) => {
    const isCheckedInAppDetail = isAppearInScope(scope.name, appScopes)
    const isCheckedInRevision = isAppearInScope(scope.name, revisionScopes)
    return (
      <div className={elMb5} key={scope.name}>
        <BodyText hasGreyText>{scope.description}</BodyText>
        <DiffCheckbox currentChecked={isCheckedInAppDetail} changedChecked={isCheckedInRevision} />
      </div>
    )
  })
}

export const getChangedMediaList = ({ app, revision }): DiffMediaModel[] => {
  const { media: revisionMedia } = revision
  const { media: appMedia } = app
  if (!revisionMedia || !appMedia) {
    return [
      {
        order: 0,
        type: 'media',
      },
    ]
  }
  // Check the longest array to compare
  const isNewMediaMoreItemThanOldOne = revisionMedia.length >= appMedia.length
  if (isNewMediaMoreItemThanOldOne) {
    return revisionMedia.map((revisionMedia: MediaModel, index: number) => ({
      changedMedia: revisionMedia?.uri,
      currentMedia: appMedia[index]?.uri,
      order: revisionMedia?.order || 0,
      type: revisionMedia?.type || '',
    }))
  }

  return appMedia.map((currentMedia: MediaModel, index: number) => ({
    changedMedia: revisionMedia[index]?.uri,
    currentMedia: currentMedia?.uri,
    order: currentMedia?.order || 0,
    type: currentMedia?.type || 'media',
  }))
}

export const mapIntegrationIdArrayToNameArray = (
  desktopIntegrationTypeIds?: string[],
  desktopIntegrationTypesArray?: DesktopIntegrationTypeModel[],
): string[] => {
  if (!desktopIntegrationTypeIds || !desktopIntegrationTypesArray) {
    return []
  }
  const result = desktopIntegrationTypeIds.map((id: string) => {
    const matchedIntegration = desktopIntegrationTypesArray.find(
      (integration: DesktopIntegrationTypeModel) => integration.id === id,
    )
    return matchedIntegration?.name ?? ''
  })
  return result.filter((r) => r)
}

export type RenderDiffContentParams = {
  key: string
  revision: AppRevisionModel
  app: AppDetailModel
  desktopIntegrationTypes: DesktopIntegrationTypeModelPagedResult
}

export const renderDiffContent = ({ key, revision, app, desktopIntegrationTypes }: RenderDiffContentParams) => {
  if (key === 'category') {
    return (
      <DiffViewer currentString={app.category?.name || ''} changedString={revision.category?.name || ''} type="words" />
    )
  }
  if (key === 'description') {
    return <DiffRenderHTML currentString={app.description || ''} changedString={revision.description || ''} />
  }
  if (key === 'desktopIntegrationTypeIds') {
    const oldIntegrationTypeArray = mapIntegrationIdArrayToNameArray(
      app.desktopIntegrationTypeIds,
      desktopIntegrationTypes.data,
    )
    const newIntegrationTypeArray = mapIntegrationIdArrayToNameArray(
      revision.desktopIntegrationTypeIds,
      desktopIntegrationTypes.data,
    )
    const sortedOldArray = [...oldIntegrationTypeArray].sort()
    const sortedNewArray = [...newIntegrationTypeArray].sort()
    return (
      <DiffViewer
        currentString={sortedOldArray.join(', ')}
        changedString={sortedNewArray.join(', ')}
        type="wordsWithSpace"
      />
    )
  }
  if (['redirectUris', 'signoutUris', 'limitToClientIds', 'desktopIntegrationTypeIds'].includes(key)) {
    const currentString = Array.isArray(app[key]) ? app[key].join(' ') : ''
    const changedString = Array.isArray(revision[key]) ? revision[key].join(' ') : ''
    return <DiffViewer currentString={currentString} changedString={changedString} type="words" />
  }
  return <DiffViewer currentString={app[key] || ''} changedString={revision[key] || ''} type="words" />
}

export const AppRevisionComparison: FC<AppRevisionComparisonProps> = ({ approval }) => {
  const appId = approval?.appId
  const revisionId = approval?.appRevisionId
  console.log(appId, revisionId)
  const [app, appLoading] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: {
      appId,
    },
    fetchWhenTrue: [appId],
  })

  const [revision, revisionLoading] = useReapitGet<AppRevisionModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getRevisionById],
    uriParams: {
      revisionId,
      appId,
    },
    fetchWhenTrue: [revisionId, appId],
  })

  const [desktopIntegrationTypes, desktopTypesLoading] = useReapitGet<DesktopIntegrationTypeModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDesktopIntegrationTypes],
  })

  const [scopes, scopesLoading] = useReapitGet<ScopeModel[]>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppPermissions],
  })

  if (appLoading || revisionLoading || desktopTypesLoading || scopesLoading) {
    return <Loader />
  }

  if (!approval || !app || !revision || !desktopIntegrationTypes || !scopes) {
    return (
      <PersistentNotification className={elMb11} intent="secondary" isExpanded isFullWidth isInline>
        Data not returned to complete this request
      </PersistentNotification>
    )
  }

  return (
    <div>
      {Object.keys(diffStringList).map((key) => {
        return (
          <div className={elMb5} key={key}>
            <BodyText hasGreyText>{diffStringList[key]}</BodyText>
            {renderDiffContent({ key, app, desktopIntegrationTypes, revision })}
          </div>
        )
      })}
      {renderCheckboxesDiff({ scopes, appScopes: app.scopes, revisionScopes: revision.scopes })}
      <div className={elMb5}>
        <BodyText>Is listed</BodyText>
        <DiffCheckbox
          currentChecked={Boolean(app.isListed)}
          changedChecked={Boolean(revision.isListed)}
          dataTest="revision-diff-isListed"
        />
      </div>
      <div className={elMb5}>
        <BodyText>Is Free</BodyText>
        <DiffCheckbox
          currentChecked={Boolean(app.isFree)}
          changedChecked={Boolean(revision.isFree)}
          dataTest="revision-diff-isFree"
        />
      </div>
      <div className={elMb5}>
        <BodyText>Is Integration</BodyText>
        <DiffCheckbox
          currentChecked={Boolean(app.isDirectApi)}
          changedChecked={Boolean(revision.isDirectApi)}
          dataTest="revision-diff-isDirectApi"
        />
      </div>
      {getChangedMediaList({ app, revision }).map((media) => (
        <div className={elMb5} key={media.order}>
          <BodyText hasGreyText>
            {media.type} {media.order > 0 && <span>{media.order}</span>}
          </BodyText>
          <DiffMedia changedMedia={media.changedMedia} currentMedia={media.currentMedia} type={media.type} />
        </div>
      ))}
    </div>
  )
}

export default AppRevisionComparison
