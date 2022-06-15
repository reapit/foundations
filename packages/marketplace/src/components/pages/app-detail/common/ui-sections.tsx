import * as React from 'react'
import {
  CategoryModel,
  DesktopIntegrationTypeModel,
  InstallationModel,
  MediaModel,
  ScopeModel,
} from '@reapit/foundations-ts-definitions'
import { AppDetailSection, Tag, ImageSection } from './ui-helpers'
import { convertBooleanToYesNoString } from '@/utils/boolean-to-yes-no-string'
import { FaCheck, FaExternalLinkAlt } from 'react-icons/fa'
import * as styles from '../__styles__/standalone-app-detail'
import {
  LevelRight,
  Button,
  Table,
  Grid,
  GridItem,
  GridFourCol,
  GridFourColItem,
  HTMLRender,
  Content,
} from '@reapit/elements-legacy'

interface IsSidebar {
  isSidebar?: boolean
}

interface CategorySectionProps extends IsSidebar {
  category: CategoryModel | undefined
}

interface DesktopIntegrationSectionProps extends IsSidebar {
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
}

interface PrivateAppSectionProps extends IsSidebar {
  limitToClientIds: string[]
}

interface DirectApiSectionProps extends IsSidebar {
  isDirectApi: boolean | undefined
}

interface StatusSectionProps extends IsSidebar {
  isListed: boolean | undefined
}

interface BackToAppsSectionProps {
  onClick: () => void
}

interface ListingPreviewSectionProps extends IsSidebar {
  onClick: () => void
}

interface SummarySectionProps {
  summary: string
}

interface InstallationsTableSectionProps extends IsSidebar {
  data: InstallationModel[]
  columns: any[]
}

interface AdditionalImagesSectionProps {
  images: MediaModel[]
  splitIndex: number
  numberImages: number
}

interface PermissionSectionProps {
  permissions: ScopeModel[]
}

interface DescriptionSectionProps {
  description: string
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, isSidebar = false }) => (
  <AppDetailSection headerText="Category" isSidebar={isSidebar}>
    {category ? <Tag>{category.name}</Tag> : <p>None</p>}
  </AppDetailSection>
)

export const DesktopIntegrationSection: React.FC<DesktopIntegrationSectionProps> = ({
  desktopIntegrationTypes,
  isSidebar = false,
}) => (
  <AppDetailSection headerText="Desktop Integration" isSidebar={isSidebar}>
    {desktopIntegrationTypes.length ? (
      desktopIntegrationTypes.map(({ name }) => <Tag key={name}>{name}</Tag>)
    ) : (
      <p>None</p>
    )}
  </AppDetailSection>
)

export const PrivateAppSection: React.FC<PrivateAppSectionProps> = ({ limitToClientIds, isSidebar = false }) => (
  <AppDetailSection headerText="Private App" isSidebar={isSidebar}>
    {convertBooleanToYesNoString(Boolean(limitToClientIds.length > 0))}
  </AppDetailSection>
)

export const DirectApiSection: React.FC<DirectApiSectionProps> = ({ isDirectApi, isSidebar = false }) => (
  <AppDetailSection headerText="Integration" isSidebar={isSidebar}>
    {convertBooleanToYesNoString(Boolean(isDirectApi))}
  </AppDetailSection>
)

export const StatusSection: React.FC<StatusSectionProps> = ({ isListed, isSidebar = false }) => (
  <AppDetailSection headerText="Status" isSidebar={isSidebar}>
    <div>
      {isListed ? (
        <>
          Listed <FaCheck className={styles.check} />
        </>
      ) : (
        'Not listed'
      )}
    </div>
  </AppDetailSection>
)

export const BackToAppsSection: React.FC<BackToAppsSectionProps> = ({ onClick }) => (
  <LevelRight className="pt-4 bt mt-4 flex">
    <Button onClick={onClick}>Back To Apps</Button>
  </LevelRight>
)

export const ListingPreviewSection: React.FC<ListingPreviewSectionProps> = ({ onClick, isSidebar = false }) => {
  const onListingPreviewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick()
  }
  return (
    <AppDetailSection
      headerText={
        <>
          <span className="mr-2">See listing preview</span>{' '}
          <a className={styles.preview} href="#" onClick={onListingPreviewClick}>
            <FaExternalLinkAlt />
          </a>
        </>
      }
      isSidebar={isSidebar}
    >
      <p>The listing preview will display your app as it would appear in the Marketplace</p>
    </AppDetailSection>
  )
}

export const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => <Content>{summary}</Content>

export const InstallationsTableSection: React.FC<InstallationsTableSectionProps> = ({
  data,
  columns,
  isSidebar = false,
}) => {
  const testId = !data.length ? 'render-installations-table-empty-text' : 'render-installations-table'
  return (
    <AppDetailSection dataTest={testId} headerText="Installations" isSidebar={isSidebar}>
      {!data.length ? (
        <p>Currently, there are no installations for your app</p>
      ) : (
        <Table data={data} scrollable columns={columns} loading={false} />
      )}
    </AppDetailSection>
  )
}

export const DeveloperAboutSection: React.FC<IsSidebar> = ({ isSidebar = false, children }) => (
  <AppDetailSection headerText="About Developer" isSidebar={isSidebar}>
    {children}
  </AppDetailSection>
)

export const AdditionalImagesSection: React.FC<AdditionalImagesSectionProps> = ({
  images,
  splitIndex,
  numberImages,
}) => {
  const extraImages = images.filter((_, index) => index > splitIndex)
  return (
    (extraImages.length && (
      <Grid className="is-desktop flex-col-min-height" isMultiLine>
        {extraImages.map(({ uri }, index) => {
          if (index < numberImages) {
            return (
              <GridItem className="is-half-desktop" key={uri}>
                <ImageSection uri={uri} />
              </GridItem>
            )
          }
        })}
      </Grid>
    )) ||
    null
  )
}

export const PermissionsSection: React.FC<PermissionSectionProps> = ({ permissions }) => (
  <AppDetailSection headerText="Permissions required">
    <GridFourCol>
      {permissions?.map((permission) => (
        <GridFourColItem key={permission?.name}>{permission?.description ?? ''}</GridFourColItem>
      ))}
    </GridFourCol>
  </AppDetailSection>
)

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => (
  <HTMLRender html={description} />
)
