import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Button } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import styles from '@/styles/pages/success.scss?mod'
import ProfileNav from '../ui/profile-nav'

export const SuccessPage = () => {
  return (
    <ErrorBoundary>
      <ProfileNav></ProfileNav>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.name}>Mr Phillips</h2>
          </div>
          <div className={styles.headerRight}>
            <h4 className={styles.refCode}>RPS Reference: MX12548</h4>
          </div>
        </div>

        <div className="flex">
          <div className={styles.leftBlock}>
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>
                <FaCheck />
              </span>
              <p>
                Thank you for submitting this information, we are in the process of checking the details and will come
                back to you shortly. Please click on the following button to complete this submission.
              </p>
            </div>
            <Button variant="primary" type="button">
              Complete Submission
            </Button>
          </div>
          <div className={styles.rightBlock}>
            <ul>
              <li>Name: Mr Phillips</li>
              <li>Address: 1 Address Street, Hatfield, AL89 9IU</li>
              <li>ID: Passport & Driving Licence</li>
              <li>Address Information: 3 years 4 months</li>
              <li>Agent Checks: completed</li>
            </ul>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default SuccessPage
