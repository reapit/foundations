import * as React from 'react'
import routes from '@/constants/routes'
import dayjs from 'dayjs'
import { Dispatch } from 'redux'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { DATE_TIME_FORMAT } from '@reapit/elements-legacy'
import { InstallationModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { AppDetailState } from '@/reducers/apps/app-detail'
import { fetchInstallationsList } from '@/actions/installations'
import { BodyText, ColSplit, Grid, InputWrap, Subtitle, Title, Button } from '@reapit/elements'

export type AppContentProps = {
  appDetailState: AppDetailState
}

export type CustomUninstallCell = React.FC<{ onClick: () => void }>

interface HandleUninstallSuccessParams {
  handleAfterClose: any
  setUninstallApp: React.Dispatch<React.SetStateAction<InstallationModel | undefined>>
  developerId: string
  appId: string
  dispatch: Dispatch
}

export const handleUninstallSuccess =
  ({ handleAfterClose, setUninstallApp, developerId, appId, dispatch }: HandleUninstallSuccessParams) =>
  () => {
    handleAfterClose({ setUninstallApp })
    dispatch(
      fetchInstallationsList({
        appId: [appId],
        pageNumber: 1,
        pageSize: GET_ALL_PAGE_SIZE,
        isInstalled: true,
        developerId: [developerId],
      }),
    )
  }

export const handleOpenAppPreview = (appId: string, appDetailState: AppDetailModel) => () => {
  const url = routes.APP_PREVIEW.replace(':appId', appId)
  localStorage.setItem('developer-preview-app', JSON.stringify(appDetailState))
  window.open(url, '_blank')
}

export const CustomUninstallCell: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <a onClick={onClick}>Uninstall</a>
)

export const generateInstallationTableColumns =
  (onUninstall: (app: InstallationModel) => () => void, CustomUninstallCell?: CustomUninstallCell) => () => {
    const UninstallCell = ({ row }) => {
      if (CustomUninstallCell) {
        return <CustomUninstallCell onClick={onUninstall(row.original)} />
      }

      return (
        <Button type="button" intent="primary" onClick={onUninstall(row.original)}>
          Uninstall
        </Button>
      )
    }

    return [
      {
        Header: 'Client',
        accessor: 'client',
      },
      {
        Header: 'Company Name',
        accessor: 'customerName',
      },
      {
        Header: 'Company Address',
        accessor: ({ customerAddress = {} }: { customerAddress: InstallationModel['customerAddress'] }) => {
          const {
            buildingName = '',
            buildingNumber = '',
            line1 = '',
            line2 = '',
            line3 = '',
            line4 = '',
            postcode = '',
            countryId = '',
          } = customerAddress

          return `${buildingName} ${buildingNumber} ${line1} ${line2} ${line3} ${line4} ${postcode} ${countryId}`
        },
      },
      {
        Header: 'Date Installed',
        accessor: (d) => dayjs(d.created).format(DATE_TIME_FORMAT.DATE_FORMAT),
      },
      {
        Header: 'Installed By',
        accessor: 'installedBy',
      },
      {
        Header: 'Uninstall',
        Cell: UninstallCell,
      },
    ]
  }

const AppContent: React.FC<AppContentProps> = ({ appDetailState }) => {
  const appDetailData = appDetailState.data || {}

  return (
    <>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Authentication (Client ID)</Subtitle>
            <BodyText hasGreyText>{appDetailData.id}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Status</Subtitle>
            <BodyText hasGreyText>{appDetailData.isHidden}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>General Information</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>App Name</Subtitle>
            <BodyText hasGreyText>{appDetailData.name}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Category</Subtitle>
            <BodyText hasGreyText>{appDetailData.category}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Support Email</Subtitle>
            <BodyText hasGreyText>{appDetailData.supportEmail}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Telephone</Subtitle>
            <BodyText hasGreyText>{appDetailData.telephone}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Agency Cloud Integration Type</Subtitle>
            <BodyText hasGreyText>{appDetailData.desktopIntegrationTypeIds}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Lanuch URL</Subtitle>
            <BodyText hasGreyText>{appDetailData.launchUri || 'None'}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Homepage</Subtitle>
            <BodyText hasGreyText>{appDetailData.homePage}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Pricing Info</Subtitle>
            <BodyText hasGreyText>{appDetailData.pricingUrl || 'Not available'}</BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle>Privacy Policy</Subtitle>
            <BodyText hasGreyText>{appDetailData.privacyPolicyUrl}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Permissions</Subtitle>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>About App</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Description</Subtitle>
            <BodyText hasGreyText>{appDetailData.description}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Summary</Subtitle>
            <BodyText hasGreyText>{appDetailData.summary}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>Images</Title>
      <Title>Reapit Connect Authentication</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Redirect URL(s)*</Subtitle>
            <BodyText hasGreyText>{appDetailData.redirectUris?.join(', ')}</BodyText>
          </InputWrap>
        </ColSplit>
        <ColSplit>
          <InputWrap>
            <Subtitle>Sign Out URI(s)*</Subtitle>
            <BodyText hasGreyText>{appDetailData.signoutUris?.join(', ')}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
      <Title>About Developer</Title>
      <Grid>
        <ColSplit>
          <InputWrap>
            <Subtitle>Description</Subtitle>
            <BodyText hasGreyText>{appDetailData.developerAbout}</BodyText>
          </InputWrap>
        </ColSplit>
      </Grid>
    </>
  )
}

export default AppContent
