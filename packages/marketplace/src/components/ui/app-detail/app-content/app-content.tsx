import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Slider, { Settings } from 'react-slick'
import ChevronLeftIcon from '@/components/svg/chevron-left'
import { FaCheck, FaTimes, FaCopy } from 'react-icons/fa'
import { Grid, GridItem, SubTitleH6, H6, GridThreeColItem } from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import AuthFlow from '@/constants/app-auth-flow'
import AppAuthenticationDetail from '../../app-authentication-detail'
import styles from '@/styles/blocks/app-detail.scss?mod'
import carouselStyles from '@/styles/elements/carousel.scss?mod'
import '@/styles/vendor/slick.scss'

type AppContentProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  loginType: string
}

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

const AppContent: React.FC<AppContentProps> = ({ appDetailData, loginType }) => {
  const {
    externalId,
    isListed,
    id,
    developer,
    authFlow,
    isWebComponent,
    apiKey,
    media = [],
    scopes = [],
    description,
    installedOn,
  } = appDetailData
  const [isShowApiKey, setIsShowApikey] = React.useState<boolean>(false)

  const isCurrentLoggedUserClient = loginType === 'CLIENT'
  const isCurrentLoggedUserDeveloper = loginType === 'DEVELOPER'
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
    <Grid>
      <GridItem className="is-4">
        {isCurrentLoggedUserDeveloper && (
          <>
            <div key="app-developer" className={styles.appInfoRow}>
              <p className={styles.appInfoProperty}>Developer:</p>
              <p>{developer}</p>
            </div>
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
      </GridItem>
      <GridItem className="is-8">
        <p>{description}</p>
        <br />
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
      </GridItem>
    </Grid>
  )
}

export default AppContent
