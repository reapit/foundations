import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ProfileToggle from '@/components/ui/profile-toggle'
import { Button } from '@reapit/elements'
import styles from '@/styles/pages/profile.scss?mod'
import logo from '@/assets/images/lifetimelegalblue.png'
import { Link } from 'react-router-dom'
import PersonalDetails from '../ui/personal-details'

const items = [
  {
    title: 'Personal Details',
    complete: true,
    children: <PersonalDetails contact={{}} />
  },
  {
    title: 'Primary ID',
    complete: true,
    children: <div>details</div>
  },
  {
    title: 'Secondary Id',
    complete: true,
    children: <div>details</div>
  },
  {
    title: 'Address History',
    complete: true,
    children: <div>details</div>
  },
  {
    title: 'Agent checks',
    complete: false,
    children: <div>details</div>
  }
]

export const Profile = () => {
  return (
    <ErrorBoundary>
      <div className={styles.nav}>
        <div className="container">
          <Link to="/">
            <img className={styles.logoImage} src={logo} />
          </Link>
        </div>
      </div>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Mr Phillips</h2>
          <div>RPS Reference: MX12548</div>
        </div>
        <div>
          {items.map(({ title, complete, children }) => (
            <ProfileToggle key={title} title={title} complete={complete}>
              {children}
            </ProfileToggle>
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <Button variant="primary" type="button" disabled>
            Submit Record for Checks
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default Profile
