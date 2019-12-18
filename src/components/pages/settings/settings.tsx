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
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import EnhanceContactInformation, { ContactInformationValues } from './contact-information-form'
import EnhanceChangePasswordForm, { ChangePasswordValues } from './change-password-form'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { authClear } from '@/actions/auth'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { updateDeveloperData, changePassword } from '@/actions/settings'

export type SettingsPageProps = StateProps & DispatchProps

export const SettingsPage: React.FC<SettingsPageProps> = ({
  developerInfo,
  email,
  loading,
  updateDeveloperInformation,
  changePassword
}) => {
  if (loading) {
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
                developerInformation={developerInfo}
                updateDeveloperInformation={updateDeveloperInformation}
              />
            </GridItem>
            <GridItem>
              <EnhanceChangePasswordForm email={email} changePassword={changePassword} />
            </GridItem>
          </Grid>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export type StateProps = {
  developerInfo: DeveloperModel | null
  email: string
  loading: boolean
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    developerInfo: state.settings.developerInfomation || {},
    email: state.auth?.loginSession?.loginIdentity?.email || '',
    loading: state.settings?.loading
  }
}

export type DispatchProps = {
  updateDeveloperInformation: (values: ContactInformationValues) => void
  changePassword: (values: ChangePasswordValues) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    updateDeveloperInformation: (values: ContactInformationValues) => dispatch(updateDeveloperData(values)),
    changePassword: (values: ChangePasswordValues) => dispatch(changePassword(values))
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export const EnhanceSettingPage = compose<React.FC<SettingsPageProps>>(withRedux)(SettingsPage)
EnhanceSettingPage.displayName = 'EnhanceSettingPage'

export default EnhanceSettingPage as React.LazyExoticComponent<any>
