import * as React from 'react'
import { H3, Button, LevelRight, FormHeading, FormSubHeading, Section } from '@reapit/elements'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { authLogout } from '@/actions/auth'
import { selectClientId, selectIsDesktopMode } from '@/selector/auth'

// clean
export const handleLogout = (dispatch: Dispatch) => () => {
  dispatch(authLogout())
}

export const Settings: React.FC = () => {
  // s get hook
  const dispatch = useDispatch()
  const customerId = useSelector(selectClientId)
  const isDesktopMode = useSelector(selectIsDesktopMode)

  const logout = handleLogout(dispatch)
  return (
    <>
      <Section>
        <H3>Settings</H3>
      </Section>
      <Section>
        <FormHeading>
          Customer ID: <strong>{customerId}</strong>
        </FormHeading>
        <FormSubHeading>
          This is your Customer ID which you will need for use with Private Apps and Web Components.
        </FormSubHeading>
        <LevelRight className="bt pt-4">
          {!isDesktopMode && (
            <Button dataTest="logout-btn" variant="primary" type="button" onClick={logout}>
              Logout
            </Button>
          )}
        </LevelRight>
      </Section>
    </>
  )
}

export default Settings
