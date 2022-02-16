import { ReapitConnectSession } from '@reapit/connect-session'
import { render } from '@testing-library/react'
import React from 'react'
import { AppsNew, handleNavigateOnSuccess, handleSubmitApp, stepIsValid } from '../apps-new'
import { AppWizardProvider } from '../use-app-wizard'
import { History } from 'history'
import Routes from '../../../../../constants/routes'
import { AppNewStepId } from '../config'

jest.mock('project-name-generator', () => ({
  __esModule: true,
  default: () => ({
    dashed: 'stub-name',
  }),
}))

describe('AppsNew', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppWizardProvider>
          <AppsNew />
        </AppWizardProvider>,
      ),
    ).toMatchSnapshot()
  })

  it('should handle next step and previous step on button click', async () => {
    const rendered = render(
      <AppWizardProvider>
        <AppsNew />
      </AppWizardProvider>,
    )

    expect(rendered.queryByText('Client Side')).toBeNull()
    const existingCustomer = await rendered.findByText('Other')
    existingCustomer.click()

    const nextButton = await rendered.findByText('Next')
    nextButton.click()

    const existingCustomerStep = await rendered.findByText('Client Side')
    expect(existingCustomerStep).toBeDefined()
    expect(rendered.queryByText('Other')).toBeNull()

    const prevButton = await rendered.findByText('Prev')
    prevButton.click()

    expect(rendered.queryByText('Client Side')).toBeNull()
    const previousExistingCustomer = await rendered.findByText('Other')
    expect(previousExistingCustomer).toBeDefined()
  })

  it('should handle app submission for a clientCredentials app', () => {
    const authFlow = 'clientCredentials'
    const connectSession = {
      loginIdentity: {
        developerId: 'SOME_ID',
        orgName: 'Some Org',
      },
    } as ReapitConnectSession
    const createApp = jest.fn()
    const formValues = {
      redirectUris: 'http://localhost:8080',
      signoutUris: 'http://localhost:8080/login',
      scopes: 'agencyCloud:applicants.write',
    }

    const curried = handleSubmitApp(authFlow, connectSession, createApp)

    curried(formValues)

    expect(createApp).toHaveBeenCalledWith({
      authFlow,
      name: 'some-org-stub-name',
      scopes: [formValues.scopes],
      developerId: connectSession.loginIdentity.developerId,
    })
  })

  it('should handle app submission for a authorisationCode app', () => {
    const authFlow = 'authorisationCode'
    const connectSession = {
      loginIdentity: {
        developerId: 'SOME_ID',
        orgName: 'Some Org',
      },
    } as ReapitConnectSession
    const createApp = jest.fn()
    const formValues = {
      redirectUris: 'http://localhost:8080',
      signoutUris: 'http://localhost:8080/login',
      scopes: 'agencyCloud:applicants.write',
    }

    const curried = handleSubmitApp(authFlow, connectSession, createApp)

    curried(formValues)

    expect(createApp).toHaveBeenCalledWith({
      authFlow,
      name: 'some-org-stub-name',
      scopes: [formValues.scopes],
      developerId: connectSession.loginIdentity.developerId,
      redirectUris: [formValues.redirectUris],
      signoutUris: [formValues.signoutUris],
    })
  })

  it('should not submit if no developerId', () => {
    const authFlow = 'authorisationCode'
    const connectSession = {
      loginIdentity: {
        developerId: null,
        orgName: 'Some Org',
      },
    } as ReapitConnectSession
    const createApp = jest.fn()
    const formValues = {
      redirectUris: 'http://localhost:8080',
      signoutUris: 'http://localhost:8080/login',
      scopes: 'agencyCloud:applicants.write',
    }

    const curried = handleSubmitApp(authFlow, connectSession, createApp)

    curried(formValues)

    expect(createApp).not.toHaveBeenCalled()
  })

  it('should handle navigate on success', () => {
    const appCreated = true
    const history = {
      push: jest.fn(),
    } as unknown as History

    const curried = handleNavigateOnSuccess(appCreated, history)

    curried()

    expect(history.push).toHaveBeenCalledWith(Routes.APPS)
  })

  it('should check if a step is valid for authorisationCode flow and no step history', async () => {
    const authFlow = 'authorisationCode'
    const stepHistory = []
    const trigger = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))

    expect(await stepIsValid(authFlow, stepHistory, trigger)).toBe(true)
  })

  it('should check if a step is valid for authorisationCode flow and has step history', async () => {
    const authFlow = 'authorisationCode'
    const stepHistory = [AppNewStepId.agencyCloudStep, AppNewStepId.clientSideStep, AppNewStepId.rcRedirectsStep]
    const trigger = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))

    expect(await stepIsValid(authFlow, stepHistory, trigger)).toBe(true)
  })
})
