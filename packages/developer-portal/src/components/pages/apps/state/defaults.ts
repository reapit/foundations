import { AppAuthFlow } from './../new/config'
import { AppNewStepId } from '../new/config'

export const defaultAppTabsState = {
  isCompletingListing: false,
  isAgencyCloudIntegrated: false,
  isListed: false,
}

export const defaultAppWizardState = {
  currentStep: AppNewStepId.applicationTypeStep,
  nextStep: null,
  prevStep: null,
  stepHistory: [AppNewStepId.applicationTypeStep],
  authFlow: 'clientCredentials' as AppAuthFlow,
  lastStep: false,
}
