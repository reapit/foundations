import React from 'react'
import { Link } from 'react-router-dom'
import styles from '@/styles/ui/navbar/navbar.scss?mod'

export type NavbarProps = {
  logout: () => void
}
export const Navbar: React.FC<NavbarProps> = ({ logout }) => {
  return (
    <div className={styles.root}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img className={styles.logoImage} src="/public/lifetimelegal.png" />
        </Link>
      </div>
      <div className={styles.menuContainer}>
        <Link className={styles.menuLink} to="/client-search">
          <div className={styles.menuItem}>Client Search</div>
        </Link>
        <span> | </span>
        <Link className={styles.menuLink} to="/search-result">
          <div className={styles.menuItem}>Search Result</div>
        </Link>
        <span> | </span>
        <div onClick={logout} className={styles.menuItem}>
          Logout
        </div>
      </div>
    </div>
  )
}

export default Navbar
