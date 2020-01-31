import * as React from 'react'
import { ReduxState } from '@/types/core'
import Slider, { Settings } from 'react-slick'
import carouselStyles from '../../styles/elements/carousel.scss?mod'
import ChevronLeftIcon from '@/components/svg/chevron-left'
import '@/styles/vendor/slick.scss'
import { connect } from 'react-redux'
import { setAppDetailModalStateInstall, setAppDetailModalStateUninstall } from '@/actions/app-detail-modal'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Tile, ModalHeader, ModalBody, ModalFooter, H6, GridFiveCol, GridFourColItem } from '@reapit/elements'
import { setDeveloperAppModalStateDelete } from '@/actions/developer-app-modal'
import styles from '@/styles/blocks/app-detail.scss?mod'
import appCardStyles from '@/styles/blocks/app-card.scss?mod'
import { FaCheck, FaTimes } from 'react-icons/fa'
import AppAuthenticationDetail from './app-authentication-detail'
import AuthFlow from '@/constants/app-auth-flow'

export interface AppDetailModalInnerProps {
  data: AppDetailModel
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
  } = data
  const icon = media.filter(({ type }) => type === 'icon')[0]
  const carouselImages = media.filter(({ type }) => type === 'image')

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
                  <p className={styles.appInfoProperty}>App ID:</p>
                  <p>{id}</p>
                </div>
                <div key="app-listed" className={styles.appInfoRow}>
                  <p className={styles.appInfoProperty}>Status:</p>
                  <p className={styles.appInfoSpace}>{isListed ? 'Listed' : 'Not listed'}</p>
                  {isListed ? <FaCheck className={styles.isListed} /> : <FaTimes className={styles.notListed} />}
                </div>
                {authFlow === AuthFlow.CLIENT_SECRET && id && <AppAuthenticationDetail appId={id} />}
              </>
            )}
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
            <GridFiveCol>
              {scopes.map(item => (
                <GridFourColItem className={styles.permissionItem} key={item.name}>
                  <li>{item.description}</li>
                </GridFourColItem>
              ))}
            </GridFiveCol>
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
