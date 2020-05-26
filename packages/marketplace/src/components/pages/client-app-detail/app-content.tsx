import * as React from 'react'
import { H5, HTMLRender, Button } from '@reapit/elements'
import { CategoryModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/blocks/app-detail.scss?mod'
import { ScopeModel, MediaModel } from '@reapit/foundations-ts-definitions'
import '@/styles/vendor/slick.scss'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'
import { Tag } from '@/components/pages/developer-app-detail/app-detail/tag'
import { RenderWithHeader } from '@/components/pages/developer-app-detail/app-detail/render-with-header'
import standAloneAppDetailStyles from '@/styles/blocks/standalone-app-detail.scss?mod'

import { AppDetailDataNotNull } from '@/reducers/client/app-detail'

export type AppContentProps = {
  appDetailData: AppDetailDataNotNull
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

export const renderDescripion = (description: string) => (
  <div className={clientAppDetailStyles.gutter}>
    <H5>Description</H5>
    <HTMLRender className={styles.description} html={description} />
  </div>
)

export const renderPermissions = (scopes: ScopeModel[] = []) => (
  <div className={clientAppDetailStyles.gutter}>
    <H5>Permission Required</H5>
    <ul className={clientAppDetailStyles.permissionList}>
      {scopes.map(scope => (
        <li key={scope?.description}>{scope?.description}</li>
      ))}
    </ul>
  </div>
)

export const renderCategory = (category: CategoryModel | undefined) => {
  if (!category) {
    return null
  }

  return (
    <div className={clientAppDetailStyles.gutter}>
      <H5 className={standAloneAppDetailStyles.headerWithoutMargin}>Category</H5>
      <Tag>{category.name}</Tag>
    </div>
  )
}

export const renderDesktopIntegrationTypes = (desktopIntegrationTypes: DesktopIntegrationTypeModel[]) => {
  if (desktopIntegrationTypes.length === 0) {
    return null
  }

  return (
    <div className={clientAppDetailStyles.gutter}>
      <H5 className={standAloneAppDetailStyles.headerWithoutMargin}>Destop Integration</H5>
      {desktopIntegrationTypes.map(({ name }) => (
        <Tag key={name}>{name}</Tag>
      ))}
    </div>
  )
}

export const renderExtraMedia = (media: MediaModel[] = []) =>
  media.map(({ uri }) => (
    <div key={uri} className={clientAppDetailStyles.gutter}>
      <img src={uri} />
    </div>
  ))

const AppContent: React.FC<AppContentProps> = ({ appDetailData, desktopIntegrationTypes = [] }) => {
  const { summary = '', description = '', category, scopes = [], media = [] } = appDetailData
  /**
   * 0 = icon
   * 1 = featured media
   * 2 -> nth: extra media
   */
  const extraMedia = media.filter((_, index) => index > 1)

  return (
    <div className={clientAppDetailStyles.appContentContainer}>
      <div className={clientAppDetailStyles.gutter}>{summary}</div>
      {renderDescripion(description)}
      {renderPermissions(scopes)}
      {renderExtraMedia(extraMedia)}
      <div className={clientAppDetailStyles.hiddenInDesktopScreenSize}>
        {renderCategory(category)}
        {renderDesktopIntegrationTypes(desktopIntegrationTypes)}
        <RenderWithHeader header="Developer">TBC</RenderWithHeader>
        <RenderWithHeader header="About Developer">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam aliquid culpa saepe asperiores debitis illo
            dolorum dolore incidunt officiis praesentium, nemo similique veritatis exercitationem perferendis non
            mollitia animi laboriosam perspiciatis.
          </p>
        </RenderWithHeader>
        <RenderWithHeader header="Contact Developer">
          <Button type="button" variant="primary">
            NEED HELP?
          </Button>
        </RenderWithHeader>
      </div>
    </div>
  )
}

export default AppContent
