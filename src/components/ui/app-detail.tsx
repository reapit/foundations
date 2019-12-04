import * as React from 'react'
import { ReduxState, FormState } from '@/types/core'
import Slider, { Settings } from 'react-slick'
import carouselStyles from '../../styles/elements/carousel.scss?mod'
import ChevronLeftIcon from '@/components/svg/chevron-left'
import '@/styles/vendor/slick.scss'
import { connect } from 'react-redux'
import { setAppDetailModalStateViewConfirm, setAppDetailModalStateUninstall } from '@/actions/app-detail-modal'
import { AppDetailModel } from '@/types/marketplace-api-schema'
import { Button, Tile, ModalHeader, ModalBody, ModalFooter, H6 } from '@reapit/elements'
import { setDeveloperAppModalStateDelete } from '@/actions/developer-app-modal'
import styles from '@/styles/blocks/app-detail.scss?mod'

export interface AppDetailModalInnerProps {
  data: AppDetailModel
  afterClose: () => void
  footerItems?: React.ReactNode
}

export interface AppDetailModalMappedProps {
  isCurrentLoggedUserClient: boolean
  isCurrentLoggedUserDeveloper: boolean
}

export interface AppDetailModalMappedActions {
  setAppDetailModalStateViewConfirm: () => void
  setAppDetailModalStateUninstall: () => void
  setDeveloperAppModalStateDelete: () => void
}

export type AppDetailProps = AppDetailModalMappedActions & AppDetailModalMappedProps & AppDetailModalInnerProps

export const SlickButtonNav = ({ currentSlide, setAppDetailModalStateViewConfirm, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
)

export const AppDetail: React.FunctionComponent<AppDetailProps> = ({
  data,
  setAppDetailModalStateViewConfirm,
  setAppDetailModalStateUninstall,
  isCurrentLoggedUserClient,
  isCurrentLoggedUserDeveloper,
  afterClose,
  footerItems
}) => {
  if (!data) {
    return null
  }

  const { id, media = [], description, name, summary, developer, installedOn, scopes = [] } = data
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
    )
  }

  return (
    <>
      <ModalHeader title={name || ''} afterClose={afterClose} />
      <ModalBody
        body={
          <>
            <Tile
              heading={name || ''}
              subHeading={summary || ''}
              image={
                <img
                  className="image"
                  src={(icon && icon.uri) || 'https://bulma.io/images/placeholders/48x48.png'}
                  alt={name}
                />
              }
            />
            <H6>{developer}</H6>
            {isCurrentLoggedUserDeveloper && <p>App ID: {id}</p>}
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
            <p className={styles.permission}>Permissions</p>
            <small>
              {isCurrentLoggedUserDeveloper && <i>You have requested the following permissions for this App:</i>}
              {isCurrentLoggedUserClient &&
                (installedOn ? (
                  <i>This app has been granted the following permissions to your data: </i>
                ) : (
                  <i>This App requires the following permissions in order to access your data:</i>
                ))}
            </small>
            <ul className={styles.permissionList}>
              {scopes.map(item => (
                <li>{item.description}</li>
              ))}
            </ul>
          </>
        }
      />
      <ModalFooter
        footerItems={
          footerItems
            ? footerItems
            : isCurrentLoggedUserClient &&
              (installedOn ? (
                <Button
                  type="button"
                  variant="primary"
                  dataTest="btnAppDetailUninstallApp"
                  onClick={setAppDetailModalStateUninstall}
                >
                  Uninstall App
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  dataTest="btnAppDetailInstallApp"
                  onClick={() => {
                    if (!id) {
                      return
                    }
                    setAppDetailModalStateViewConfirm()
                  }}
                >
                  Install App
                </Button>
              ))
        }
      />
    </>
  )
}

export const mapStateToProps = (state: ReduxState): AppDetailModalMappedProps => {
  return {
    isCurrentLoggedUserClient: state.auth.loginType === 'CLIENT',
    isCurrentLoggedUserDeveloper: state.auth.loginType === 'DEVELOPER'
  }
}

export const mapDispatchToProps = (dispatch: any): AppDetailModalMappedActions => ({
  setAppDetailModalStateViewConfirm: () => dispatch(setAppDetailModalStateViewConfirm()),
  setAppDetailModalStateUninstall: () => dispatch(setAppDetailModalStateUninstall()),
  setDeveloperAppModalStateDelete: () => dispatch(setDeveloperAppModalStateDelete())
})

const AppDetailWithConnect = connect(mapStateToProps, mapDispatchToProps)(AppDetail)

AppDetailWithConnect.displayName = 'AppDetailWithConnect'

export default AppDetailWithConnect
