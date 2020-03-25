import * as React from 'react'
import { AppDetailState } from '@/reducers/app-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { AppRevisionModel, MediaModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import DiffMedia from '@/components/ui/diff-media'
import DiffCheckbox from '../diff-checkbox'
import DiffViewer from '../diff-viewer'

export type AppRevisionComparisionProps = {
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

export const AppRevisionComparision: React.FC<AppRevisionComparisionProps> = ({
  revisionDetailState,
  appDetailState,
}) => {
  if (!revisionDetailState.revisionDetailData || !appDetailState.appDetailData) {
    return null
  }
  const { data: revision, scopes } = revisionDetailState.revisionDetailData
  const app = appDetailState.appDetailData.data

  return (
    <div>
      {Object.keys(diffStringList).map(key => {
        if (key === 'category') {
          return (
            <div className="mb-3" key={key}>
              <h4 className="mb-2">{diffStringList[key]}</h4>
              <DiffViewer
                currentString={app.category?.name || ''}
                changedString={revision.category?.name || ''}
                type="words"
              />
            </div>
          )
        }
        if (['redirectUris', 'signoutUris'].includes(key)) {
          const currentString = Array.isArray(app[key]) ? app[key].join(' ') : ''
          const changedString = Array.isArray(revision[key]) ? revision[key].join(' ') : ''
          return (
            <div className="mb-3" key={key}>
              <h4 className="mb-2">{diffStringList[key]}</h4>
              <DiffViewer currentString={currentString} changedString={changedString} type="words" />
            </div>
          )
        } else {
          return (
            <div className="mb-3" key={key}>
              <h4 className="mb-2">{diffStringList[key]}</h4>
              <DiffViewer currentString={app[key] || ''} changedString={revision[key] || ''} type="words" />
            </div>
          )
        }
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

export default AppRevisionComparision
