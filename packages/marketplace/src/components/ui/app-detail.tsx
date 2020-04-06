import * as React from 'react'
import Slider, { Settings } from 'react-slick'
import { FaCheck, FaTimes, FaCopy } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { connect } from 'react-redux'
import { Tile, ModalHeader, ModalBody, ModalFooter, H6, GridThreeColItem, Grid, SubTitleH6 } from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'
import ChevronLeftIcon from '@/components/svg/chevron-left'
import { setAppDetailModalStateInstall, setAppDetailModalStateUninstall } from '@/actions/app-detail-modal'
import { setDeveloperAppModalStateDelete } from '@/actions/developer-app-modal'
import appCardStyles from '@/styles/blocks/app-card.scss?mod'
import AuthFlow from '@/constants/app-auth-flow'
import AppAuthenticationDetail from './app-authentication-detail'
import carouselStyles from '../../styles/elements/carousel.scss?mod'
import styles from '@/styles/blocks/app-detail.scss?mod'
import '@/styles/vendor/slick.scss'

export interface AppDetailModalInnerProps {
  data: AppDetailModel & { apiKey?: string }
  afterClose?: () => void
  footerItems?: React.ReactNode
}

export interface AppDetailModalMappedProps {
  isCurrentLoggedUserClient: boolean
  isCurrentLoggedUserDeveloper: boolean
}

export interface AppDetailModalMappedActions {
  setAppDetailModalStateInstall: () => void
  setAppDetailModalStateUninstall: () => void
  setDeveloperAppModalStateDelete: () => void
}

export type AppDetailProps = AppDetailModalMappedActions & AppDetailModalMappedProps & AppDetailModalInnerProps

export const SlickButtonNav = ({ children, ...props }) => <button {...props}>{children}</button>

export type HandleShowApiKey = {
  setIsShowApikey: React.Dispatch<React.SetStateAction<boolean>>
  isShowApiKey: boolean
}

export const handleShowApiKey = ({ setIsShowApikey, isShowApiKey }: HandleShowApiKey) => () => {
  setIsShowApikey(!isShowApiKey)
}

export const handleCopyAlert = () => alert('Copied')

export type RenderShowApiKeyForWebComponent = HandleShowApiKey & {
  isWebComponent?: boolean
  isCurrentLoggedUserDeveloper: boolean
  apiKey?: string
}

export const renderShowApiKeyForWebComponent = ({
  isWebComponent,
  setIsShowApikey,
  isShowApiKey,
  apiKey,
  isCurrentLoggedUserDeveloper,
}: RenderShowApiKeyForWebComponent) => {
  const isShow = isWebComponent && !isCurrentLoggedUserDeveloper
  if (!isShow) {
    return null
  }
  return (
    <>
      <SubTitleH6 className="mb-0">API key</SubTitleH6>
      <p>
        To obtain your unique API key, click on &apos;Show API Key&apos; below. For installation instructions, please
        click here
      </p>
      <span>Authentication:</span>&nbsp;
      <span>
        <a onClick={handleShowApiKey({ setIsShowApikey, isShowApiKey })}>
          <u>{!isShowApiKey ? 'Show' : 'Hide'} API key</u>
        </a>
      </span>
      {isShowApiKey && (
        <CopyToClipboard text={apiKey} onCopy={handleCopyAlert}>
          <div className="control has-icons-right">
            <input className="input is-primary" id="apiKey" type="text" name="apiKey" value={apiKey || ''} readOnly />
            <span className="icon is-right">
              <FaCopy />
            </span>
          </div>
        </CopyToClipboard>
      )}
    </>
  )
}

export const AppDetail: React.FunctionComponent<AppDetailProps> = ({
  data,
  isCurrentLoggedUserClient,
  isCurrentLoggedUserDeveloper,
  afterClose,
  footerItems,
}) => {
  if (!data) {
    return null
  }
  const {
    id,
    media = [],
    description,
    name,
    summary,
    developer,
    installedOn,
    scopes = [],
    isListed,
    isDirectApi,
    authFlow,
    externalId,
    isWebComponent,
    apiKey,
  } = data
  const icon = media.filter(({ type }) => type === 'icon')[0]
  const carouselImages = media.filter(({ type }) => type === 'image')
  const [isShowApiKey, setIsShowApikey] = React.useState<boolean>(false)

  const settings: Settings = {
    dots: false,
    speed: 500,
    variableWidth: true,
    prevArrow: (
      // @ts-ignore
      <SlickButtonNav>
        <ChevronLeftIcon />
      </SlickButtonNav>
    ),
    nextArrow: (
      // @ts-ignore
      <SlickButtonNav>
        <ChevronLeftIcon />
      </SlickButtonNav>
    ),
  }

  return (
    <>
      <ModalHeader title={name || ''} afterClose={afterClose as () => void} />
      <ModalBody
        body={
          <>
            <Tile
              heading={name || ''}
              subHeading={
                <>
                  {summary}
                  {isDirectApi ? <span className={appCardStyles.directAPI}>(Direct API)</span> : ''}
                </>
              }
              image={
                <img
                  className="image"
                  src={(icon && icon.uri) || 'https://bulma.io/images/placeholders/48x48.png'}
                  alt={name}
                />
              }
            >
              <div className={styles.listed}>
                <H6>{developer}</H6>
              </div>
            </Tile>
            {isCurrentLoggedUserDeveloper && (
              <>
                <p className={styles.appInfo}>App Information</p>
                <div key="app-id" className={styles.appInfoRow}>
                  <p className={styles.appInfoProperty}>Client ID:</p>
                  <p>{externalId}</p>
                </div>
                <div key="app-listed" className={styles.appInfoRow}>
                  <p className={styles.appInfoProperty}>Status:</p>
                  <p className={styles.appInfoSpace}>{isListed ? 'Listed' : 'Not listed'}</p>
                  {isListed ? <FaCheck className={styles.isListed} /> : <FaTimes className={styles.notListed} />}
                </div>
                {authFlow === AuthFlow.CLIENT_SECRET && id && <AppAuthenticationDetail appId={id} />}
              </>
            )}
            {renderShowApiKeyForWebComponent({
              isWebComponent,
              isShowApiKey,
              setIsShowApikey,
              apiKey: apiKey,
              isCurrentLoggedUserDeveloper,
            })}
            {carouselImages.length > 0 && (
              <div className={carouselStyles.container}>
                <Slider {...settings}>
                  {carouselImages.map(({ uri }, index) => (
                    <div key={index} className={carouselStyles.slide}>
                      <img src={uri} />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            <br />
            <p>{description}</p>
            <br />

            <H6>
              {isCurrentLoggedUserDeveloper && 'Permissions requested'}
              {isCurrentLoggedUserClient && (installedOn ? 'Permissions granted' : 'Permissions required')}
            </H6>
            <Grid isMultiLine>
              {scopes.map(item => (
                <GridThreeColItem key={item.name}>
                  <li>{item.description}</li>
                </GridThreeColItem>
              ))}
            </Grid>
          </>
        }
      />
      <ModalFooter footerItems={footerItems} />
    </>
  )
}

export const mapStateToProps = (state: ReduxState): AppDetailModalMappedProps => {
  return {
    isCurrentLoggedUserClient: state.auth.loginType === 'CLIENT',
    isCurrentLoggedUserDeveloper: state.auth.loginType === 'DEVELOPER',
  }
}

export const mapDispatchToProps = (dispatch: any): AppDetailModalMappedActions => ({
  setAppDetailModalStateInstall: () => dispatch(setAppDetailModalStateInstall()),
  setAppDetailModalStateUninstall: () => dispatch(setAppDetailModalStateUninstall()),
  setDeveloperAppModalStateDelete: () => dispatch(setDeveloperAppModalStateDelete()),
})

const AppDetailWithConnect = connect(mapStateToProps, mapDispatchToProps)(AppDetail)

AppDetailWithConnect.displayName = 'AppDetailWithConnect'

export default AppDetailWithConnect
