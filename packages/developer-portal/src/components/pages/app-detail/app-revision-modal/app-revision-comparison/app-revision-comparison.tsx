import * as React from 'react'
import { AppDetailState } from '@/reducers/apps/app-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { AppRevisionModel, MediaModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import DiffMedia from './diff-media'
import { AppDetailModel } from '@/types/marketplace-api-schema'
import { DesktopIntegrationTypeModel, PagedResultDesktopIntegrationTypeModel_ } from '@/actions/app-integration-types'
import DiffCheckbox from './diff-checkbox'
import DiffViewer from './diff-viewer'
import DiffRenderHTML from './diff-render-html'

export type AppRevisionComparisonProps = {
  revisionDetailState: RevisionDetailState
  appDetailState: AppDetailState
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
}

export const isAppearInScope = (nameNeedToFind: string | undefined, scopes: ScopeModel[] = []): boolean => {
  if (!nameNeedToFind || scopes.length === 0) {
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
      <div className="mb-3" key={scope.name}>
        <h4 className="mb-2">{scope.description}</h4>
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
  const filteredResult = result.filter(r => r)
  return filteredResult
}

export type RenderDiffContentParams = {
  key: string
  revision: AppRevisionModel
  app: AppDetailModel & { desktopIntegrationTypeIds?: string[] }
  desktopIntegrationTypes: PagedResultDesktopIntegrationTypeModel_
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

export const AppRevisionComparison: React.FC<AppRevisionComparisonProps> = ({
  revisionDetailState,
  appDetailState,
}) => {
  const app = appDetailState.data
  if (!revisionDetailState.revisionDetailData || !app) {
    return null
  }
  const { data: revision, scopes, desktopIntegrationTypes } = revisionDetailState.revisionDetailData

  return (
    <div>
      {Object.keys(diffStringList).map(key => {
        return (
          <div className="mb-3" key={key}>
            <h4 className="mb-2">{diffStringList[key]}</h4>
            {renderDiffContent({ key, app, desktopIntegrationTypes, revision })}
          </div>
        )
      })}
      {renderCheckboxesDiff({ scopes, appScopes: app.scopes, revisionScopes: revision.scopes })}
      <div className="mb-3">
        <h4 data-test="chkIsListed" className="mb-2">
          Is listed
        </h4>
        <DiffCheckbox
          currentChecked={Boolean(app.isListed)}
          changedChecked={Boolean(revision.isListed)}
          dataTest="revision-diff-isListed"
        />
      </div>
      <div className="mb-3">
        <h4 data-test="chkIsDirectApi" className="mb-2">
          Is Direct API
        </h4>
        <DiffCheckbox
          currentChecked={Boolean(app.isDirectApi)}
          changedChecked={Boolean(revision.isDirectApi)}
          dataTest="revision-diff-isDirectApi"
        />
      </div>
      {getChangedMediaList({ app, revision }).map(media => (
        <div className="mb-3" key={media.order}>
          <h4 className="mb-2 capitalize">
            {media.type} {media.order > 0 && <span>{media.order}</span>}
          </h4>
          <DiffMedia changedMedia={media.changedMedia} currentMedia={media.currentMedia} type={media.type} />
        </div>
      ))}
    </div>
  )
}

export default AppRevisionComparison
