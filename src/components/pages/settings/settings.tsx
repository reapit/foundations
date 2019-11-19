import * as React from 'react'
import {
  FlexContainerResponsive,
  Content,
  H3,
  FlexContainerBasic,
  GridItem,
  Grid,
  Loader,
  fetcher
} from '@reapit/elements'
import { URLS, REAPIT_API_BASE_URL, MARKETPLACE_HEADERS } from '@/constants/api'
import EnhanceContactInformation from './contact-information-form'
import EnhanceChangePasswordForm from './change-password-form'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { authClear } from '@/actions/auth'

export type HandleUseEffectProps = {
  developerId: string | null
  setDeveloperInformation: React.Dispatch<React.SetStateAction<null>>
  setLoading: (isLoading: boolean) => void
}

export const handleUseEffect = ({ developerId, setDeveloperInformation, setLoading }: HandleUseEffectProps) => () => {
  const fetchData = async () => {
    const response = await fetcher({
      url: `${URLS.developers}/${developerId}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
    setDeveloperInformation(response)
    setLoading(false)
  }
  fetchData()
}

export type SettingsPageProps = StateProps & DispatchProps

export const SettingsPage: React.FC<SettingsPageProps> = ({ developerId, logout, errorNotification }) => {
  const [isLoading, setLoading] = React.useState(true)
  const [developerInformation, setDeveloperInformation] = React.useState(null)
  React.useEffect(handleUseEffect({ developerId, setDeveloperInformation, setLoading }), [isLoading])
  if (isLoading) {
    return <Loader />
  }
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Settings</H3>
          <Grid>
            <GridItem>
              <EnhanceContactInformation
                developerInformation={developerInformation}
                setLoading={setLoading}
                developerId={developerId}
                errorNotification={errorNotification}
              />
            </GridItem>
            <GridItem>
              <EnhanceChangePasswordForm errorNotification={errorNotification} logout={logout} />
            </GridItem>
          </Grid>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export type StateProps = {
  developerId: string | null
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    developerId: state.auth?.loginSession?.loginIdentity.developerId || null
  }
}

export type DispatchProps = {
  logout: () => void
  errorNotification: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    logout: () => dispatch(authClear()),
    errorNotification: () =>
      dispatch(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export const EnhanceSettingPage = compose<React.FC<SettingsPageProps>>(withRedux)(SettingsPage)
EnhanceSettingPage.displayName = 'EnhanceSettingPage'

export default EnhanceSettingPage as React.LazyExoticComponent<any>
