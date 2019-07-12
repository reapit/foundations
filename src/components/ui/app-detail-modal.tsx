import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import Modal, { ModalProps } from '@/components/ui/modal'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import Loader from '@/components/ui/loader'
import Slider, { Settings } from 'react-slick'
import { appDetailRequestData } from '@/actions/app-detail'
import carouselStyles from '../../styles/elements/carousel.scss?mod'
import ChevronLeftIcon from '@/components/svg/chevron-left'
import Alert from '@/components/ui/alert'
import '@/styles/vendor/slick.scss'

export interface AppDetailInnerProps {
  appDetailState: AppDetailState
}

export interface AppDetailModalMappedProps {
  appDetailState: AppDetailState
}

export interface AppDetailModalMappedActions {
  fetchAppDetail: (id: string) => void
}

export type AppDetailModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

const SlickButtonNav = ({ currentSlide, slideCount, children, ...props }) => <button {...props}>{children}</button>

export const AppDetailInner: React.FunctionComponent<AppDetailInnerProps> = ({ appDetailState }) => {
  if (appDetailState.loading) {
    return <Loader />
  }

  if (appDetailState.error) {
    return <Alert type="danger" message="Failed to fetch. Please try later." />
  }

  if (!appDetailState.appDetailData) {
    return null
  }

  const {
    media = [],
    description,
    name,
    summary,
    developer,
    homePage,
    supportEmail
  } = appDetailState.appDetailData.data

  const icon = media.filter(({ type }) => type === 'icon')[0]
  const carouselImages = media.filter(({ type }) => type === 'image')

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    useCSS: true,
    variableWidth: false,
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
    slidesToShow: 3,
    slidesToScroll: 1
  }

  return (
    <>
      <div className={bulma.media}>
        <div className={bulma.mediaLeft}>
          <figure className={bulma.image + ' ' + bulma.is128x128}>{icon && <img src={icon.uri} />}</figure>
        </div>
        <div className={bulma.mediaContent}>
          <div className={bulma.content}>
            <h3 className={bulma.isH3} style={{ marginBottom: 0 }}>
              {name}
            </h3>
            <p>
              <small className={bulma.hasTextLink}>{developer}</small>
            </p>
            <p>{summary}</p>
          </div>
        </div>
      </div>
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
    </>
  )
}

const mapStateToProps = (state: ReduxState): AppDetailModalMappedProps => ({
  appDetailState: state.appDetail
})

const mapDispatchToProps = (dispatch: any): AppDetailModalMappedActions => ({
  fetchAppDetail: () => dispatch(appDetailRequestData('xxxx'))
})

const AppDetailInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetailInner)

export const AppDetailModal: React.FunctionComponent<AppDetailModalProps> = ({ visible = true, afterClose }) => {
  return (
    <Modal visible={visible} afterClose={afterClose}>
      <AppDetailInnerWithConnect />
    </Modal>
  )
}

export default AppDetailModal
