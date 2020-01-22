import React from 'react'
import { Link } from 'react-router-dom'
import styles from '@/styles/ui/profile-nav.scss?mod'
import logo from '@/assets/images/lifetimelegalblue.png'
import Routes from '@/constants/routes'

export default function ProfileNav() {
  return (
    <div className={styles.nav}>
      <div className="container">
        <Link to={Routes.HOME}>
          <img className={styles.logoImage} src={logo} />
        </Link>
      </div>
    </div>
  )
}
