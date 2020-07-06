import * as React from 'react'
import { FlexContainerResponsive, Button } from '@reapit/elements'
import CallToAction from '../ui/call-to-action'
import styles from '@/styles/pages/developer-submit-app-successfully.scss?mod'
import { Link } from 'react-router-dom'
import Routes from '@/constants/routes'

export interface DeveloperSubmitAppSuccessfullyProps {
  onGoBackToApps: () => void
  onSubmitAnotherApp: () => void
}
export const DeveloperSubmitAppSuccessfully: React.FC<DeveloperSubmitAppSuccessfullyProps> = ({
  onGoBackToApps,
  onSubmitAnotherApp,
}) => (
  <FlexContainerResponsive hasPadding flexColumn centerContent className={styles.wrapDeveloperSuccess}>
    <FlexContainerResponsive flexColumn hasBackground hasPadding>
      <CallToAction
        className="container-footer"
        isCard
        title="Success"
        dataTest="submit-success-section"
        footerItems={
          <>
            <Button variant="primary" type="button" onClick={onGoBackToApps}>
              My Apps
            </Button>
            <Button variant="primary" type="button" onClick={onSubmitAnotherApp}>
              Submit another app
            </Button>
          </>
        }
      >
        <p>Your App has now been registered and can be accessed by clicking on &lsquo;My Apps&rsquo; below.</p>
        <br />
        <p>
          You will be directed to the &lsquo;My Apps&rsquo; page where you will be able to access the &lsquo;Client
          ID&rsquo; of your App (required for authentication) and or make any changes to your App by clicking
          &lsquo;Edit Details&rsquo;.
        </p>
        <br />
        <p>
          <strong>Currently, your App is only visible to you</strong> and will not be available in the Marketplace until
          you have made it &lsquo;Listed&rsquo;. When you are ready to do this, click on &lsquo;Edit Detail&rsquo; and
          tick the &lsquo;Is Listed&rsquo; check box located in the &lsquo;Marketplace Status&rsquo; section.
        </p>
        <br />
        <p>
          <strong>Please note:</strong> Any changes you make now to your App (including making it &lsquo;Listed&rsquo;)
          will require approval. These are called &lsquo;Revisions&rsquo;. All revisions will be sent to our Admin
          department and whilst your App is being reviewed, you will not be able to make any further changes and the App
          will be marked as &lsquo;Pending Revision&rsquo;.
        </p>
        <br />
        <p>
          Once you have &lsquo;Listed&rsquo; your application, and any revisions have been approved, your app will be
          live in the Marketplace and available for install by customers.
        </p>
        <br />
        <p>
          For any issues or support, please visit the <Link to={Routes.DEVELOPER_HELP}>&lsquo;Help&rsquo;</Link> page.
        </p>

        <br />
      </CallToAction>
    </FlexContainerResponsive>
  </FlexContainerResponsive>
)

export default DeveloperSubmitAppSuccessfully
