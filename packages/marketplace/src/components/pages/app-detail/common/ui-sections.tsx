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
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'
import { LevelRight, Button, Table, Grid, GridItem, GridFourCol, GridFourColItem, HTMLRender } from '@reapit/elements'
import AuthFlow from '@/constants/app-auth-flow'
import AppAuthenticationDetail from '@/components/ui/app-authentication-detail'

type IsSidebar = {
  isSidebar?: boolean
}

export const CategorySection: React.FC<{ category: CategoryModel | undefined } & IsSidebar> = ({
  category,
  isSidebar = false,
}) => (
  <AppDetailSection headerText="Category" isSidebar={isSidebar}>
    {category ? <Tag>{category.name}</Tag> : <p>None</p>}
  </AppDetailSection>
)

export const DesktopIntegrationSection: React.FC<{
  desktopIntegrationTypes: DesktopIntegrationTypeModel[]
} & IsSidebar> = ({ desktopIntegrationTypes, isSidebar = false }) => (
  <AppDetailSection headerText="Desktop Integration" isSidebar={isSidebar}>
    {desktopIntegrationTypes.length ? (
      desktopIntegrationTypes.map(({ name }) => <Tag key={name}>{name}</Tag>)
    ) : (
      <p>None</p>
    )}
  </AppDetailSection>
)

export const PrivateAppSection: React.FC<{ limitToClientIds: string[] } & IsSidebar> = ({
  limitToClientIds,
  isSidebar = false,
}) => (
  <AppDetailSection headerText="Private App" isSidebar={isSidebar}>
    {convertBooleanToYesNoString(Boolean(limitToClientIds.length > 0))}
  </AppDetailSection>
)

export const DirectApiSection: React.FC<{ isDirectApi: boolean | undefined } & IsSidebar> = ({
  isDirectApi,
  isSidebar = false,
}) => (
  <AppDetailSection headerText="Direct API" isSidebar={isSidebar}>
    {convertBooleanToYesNoString(Boolean(isDirectApi))}
  </AppDetailSection>
)

export const StatusSection: React.FC<{ isListed: boolean | undefined } & IsSidebar> = ({
  isListed,
  isSidebar = false,
}) => (
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

export const BackToAppsSection: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <LevelRight className="pt-4 bt mt-4 flex">
    <Button onClick={onClick}>Back To Apps</Button>
  </LevelRight>
)

export const ListingPreviewSection: React.FC<{ onClick: () => void } & IsSidebar> = ({
  onClick,
  isSidebar = false,
}) => (
  <AppDetailSection
    headerText={
      <>
        <span className="mr-2">See listing preview</span> <FaExternalLinkAlt onClick={onClick} />
      </>
    }
    isSidebar={isSidebar}
  >
    <p>The listing preview will display your app as it would appear in the Marketplace</p>
  </AppDetailSection>
)

export const AuthenticationSection: React.FC<{
  authFlow: string
  id: string
  externalId: string
} & IsSidebar> = ({ authFlow, id, externalId, isSidebar = false }) => (
  <AppDetailSection headerText="Authentication" isSidebar={isSidebar}>
    {authFlow === AuthFlow.CLIENT_SECRET ? (
      <AppAuthenticationDetail withCustomHeader={true} appId={id} />
    ) : (
      <div data-test="authentication-client-id">
        <b className="mr-2">Client ID:</b>
        {externalId}
      </div>
    )}
  </AppDetailSection>
)

export const SummarySection: React.FC<{ summary: string } & IsSidebar> = ({ summary, isSidebar = false }) => (
  <AppDetailSection headerText={summary} isSidebar={isSidebar} />
)

export const InstallationsTableSection: React.FC<{
  data: InstallationModel[]
  columns: any[]
} & IsSidebar> = ({ data, columns, isSidebar = false }) => {
  const testId = !data.length ? 'render-installations-table-empty-text' : 'render-installations-table'
  return (
    <AppDetailSection dataTest={testId} headerText="Installations" isSidebar={isSidebar}>
      {!data.length ? (
        <p>Currently, there are no installations for your app</p>
      ) : (
        <Table data={data} columns={columns} loading={false} />
      )}
    </AppDetailSection>
  )
}

export const DeveloperSection: React.FC<{ developer: string | undefined } & IsSidebar> = ({
  isSidebar = false,
  developer,
}) => (
  <AppDetailSection headerText="Developer" isSidebar={isSidebar}>
    {developer}
  </AppDetailSection>
)

export const DeveloperAboutSection: React.FC<IsSidebar> = ({ isSidebar = false }) => (
  <AppDetailSection headerText="About Developer" isSidebar={isSidebar} />
)

export const SecondaryImageSection: React.FC<{ images: MediaModel[] }> = ({ images }) => {
  return (images[2]?.uri && <ImageSection uri={images[2]?.uri} />) || null
}

export const AdditionalImagesSection: React.FC<{ images: MediaModel[] }> = ({ images }) => {
  const extraImages = images.filter((_, index) => index > 1)
  return (
    (extraImages.length && (
      <Grid className="is-desktop" isMultiLine>
        {extraImages.map(({ uri }) => (
          <GridItem className="is-half-desktop is-one-third-widescreen" key={uri}>
            <ImageSection uri={uri} />
          </GridItem>
        ))}
      </Grid>
    )) ||
    null
  )
}

export const PermissionsSection: React.FC<{ permissions: ScopeModel[] }> = ({ permissions }) => (
  <AppDetailSection headerText="Permissions required">
    <GridFourCol>
      {permissions.map(permission => (
        <GridFourColItem key={permission.name}>{permission?.name ?? ''}</GridFourColItem>
      ))}
    </GridFourCol>
  </AppDetailSection>
)

export const DescriptionSection: React.FC<{ description: string } & IsSidebar> = ({
  description,
  isSidebar = false,
}) => (
  <AppDetailSection headerText="Descripton" isSidebar={isSidebar}>
    <HTMLRender html={description} />
  </AppDetailSection>
)
