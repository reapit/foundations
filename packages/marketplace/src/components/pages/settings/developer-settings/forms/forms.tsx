import * as React from 'react'
import { selectDeveloperEmail } from '@/selector/developer'
import {
  H3,
  FlexContainerResponsive,
  Content,
  FlexContainerBasic,
  GridItem,
  Grid,
  FormSection,
  Button,
  LevelRight,
  Loader,
} from '@reapit/elements'
import EnhanceContactInformation, { ContactInformationValues } from './contact-information-form'
import EnhanceChangePasswordForm, { ChangePasswordValues } from './change-password-form'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { updateDeveloperData, changePassword } from '@/actions/settings'
import { authLogout } from '@/actions/auth'
import { selectSettingsPageIsLoading, selectSettingsPageDeveloperInformation } from '@/selector/settings'

export type CreateDispatchersReturn = {
  updateDeveloperInformation: (values: ContactInformationValues) => void
  changePassword: (values: ChangePasswordValues) => void
  logout: () => void
}

export const createDispatchers = (dispatch: Dispatch): CreateDispatchersReturn => {
  return {
    updateDeveloperInformation: (values: ContactInformationValues) => dispatch(updateDeveloperData(values)),
    changePassword: (values: ChangePasswordValues) => dispatch(changePassword(values)),
    logout: () => dispatch(authLogout()),
  }
}

export type SelectorReturn = {
  developerInfo: DeveloperModel | null
  email: string
  loading: boolean
}

export const Forms: React.FC<{}> = () => {
  const dispatch = useDispatch()

  const email = useSelector(selectDeveloperEmail) || ''
  const loading = useSelector(selectSettingsPageIsLoading)
  const developerInfo = useSelector(selectSettingsPageDeveloperInformation)

  const { changePassword, logout, updateDeveloperInformation } = createDispatchers(dispatch)

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
          <FormSection>
            <LevelRight>
              <Button dataTest="logout-btn" variant="primary" type="button" onClick={logout}>
                Logout
              </Button>
            </LevelRight>
          </FormSection>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}
