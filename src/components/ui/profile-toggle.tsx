import React, { useState } from 'react'
import { MdCheck, MdClose, MdKeyboardArrowDown } from 'react-icons/md'
import styles from '@/styles/ui/profile-toggle.scss?mod'

export interface ProfileToggleProps {
  isOpen?: boolean
  title: string
  complete: boolean
}

const ProfileToggle: React.FC<ProfileToggleProps> = ({ isOpen = false, title, complete, children }) => {
  const [open, setOpen] = useState(isOpen)
  const toggle = () => setOpen(prev => !prev)

  return (
    <div className={styles.container} data-test="profile-toggle">
      <div
        className={styles.head}
        aria-expanded={complete}
        role="button"
        tabIndex={1}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            toggle()
          }
        }}
        onClick={toggle}
      >
        <h5 className={styles.heading}>{title}</h5>
        <div className="flex items-center">
          <div className={styles.status} data-test="profile-toggle-status">
            {complete ? <MdCheck className={styles.check} /> : <MdClose className={styles.times} />}
            {complete ? 'Complete' : 'Incomplete'}
          </div>
          <span className={`${styles.arrow} ${open ? styles.arrowUp : ''}`}>
            <MdKeyboardArrowDown />
          </span>
        </div>
      </div>
      {open && <div className={styles.body}>{children}</div>}
    </div>
  )
}

export default ProfileToggle
