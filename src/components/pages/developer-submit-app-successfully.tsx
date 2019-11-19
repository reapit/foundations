import * as React from 'react'
import { Link } from 'react-router-dom'
import { FlexContainerResponsive } from '@reapit/elements'
import Routes from '@/constants/routes'
import CallToAction from '../ui/call-to-action'

export interface DeveloperSubmitAppSuccessfullyProps {
  onClickHandler: () => void
}
export const DeveloperSubmitAppSuccessfully: React.FC<DeveloperSubmitAppSuccessfullyProps> = ({ onClickHandler }) => (
  <FlexContainerResponsive hasPadding flexColumn>
    <FlexContainerResponsive flexColumn hasBackground hasPadding>
      <CallToAction
        dataTest="submit-success-section"
        onButtonClick={onClickHandler}
        title="Submit Success"
        buttonText="Submit Another App"
        buttonDataTest="submit-another-button"
        isCard
      >
        You have successfully submitted your App. You will be notified via email once your app has been approved. Please
        see <Link to={Routes.DEVELOPER_MY_APPS}>Manage Apps</Link> to edit and set status to be "listed" on the
        marketplace.
      </CallToAction>
    </FlexContainerResponsive>
  </FlexContainerResponsive>
)

export default DeveloperSubmitAppSuccessfully
