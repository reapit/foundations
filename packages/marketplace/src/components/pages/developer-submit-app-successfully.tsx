import * as React from 'react'
import { FlexContainerResponsive } from '@reapit/elements'
import CallToAction from '../ui/call-to-action'
import styles from '@/styles/pages/developer-submit-app-successfully.scss?mod'

export interface DeveloperSubmitAppSuccessfullyProps {
  onClickHandler: () => void
}
export const DeveloperSubmitAppSuccessfully: React.FC<DeveloperSubmitAppSuccessfullyProps> = ({ onClickHandler }) => (
  <FlexContainerResponsive hasPadding flexColumn centerContent className={styles.wrapDeveloperSuccess}>
    <FlexContainerResponsive flexColumn hasBackground hasPadding>
      <CallToAction
        dataTest="submit-success-section"
        onButtonClick={onClickHandler}
        title="Success"
        buttonText="Submit Another App"
        buttonDataTest="submit-another-button"
        isCard
      >
        <p>Your App has been submitted successfully.</p>
        <br />
        <p>
          For it to be available on the Marketplace, you will need to make it ‘Listed’. To do this, click ‘Apps’ from
          the menu bar, open your submitted App and click ‘Edit Details’, simply tick the ‘Is Listed’ checkbox.
        </p>
        <br />
        <p>
          You can also use this section to make any additional changes. Once you are ready to proceed, click ‘Submit
          App’. Our Administration department will then review the details you have submitted. Whilst this review is
          taking place, this App will be marked as ‘Pending Revision’ and you will not be able to make any further
          changes.
        </p>
        <br />
        <p>You can check the status of any submissions by accessing ‘Apps’ from the menu bar.</p>
        <br />
        <p>For any help or support, please visit the ‘Help’ page.</p>

        <br />
      </CallToAction>
    </FlexContainerResponsive>
  </FlexContainerResponsive>
)

export default DeveloperSubmitAppSuccessfully
