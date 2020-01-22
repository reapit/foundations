import React from 'react'
import { MdCheck, MdClose, MdKeyboardArrowDown } from 'react-icons/md'
import styles from '@/styles/ui/profile-toggle.scss?mod'

export interface ProfileToggleProps {
  isOpen?: boolean
  title: string
  complete: boolean
  onToggle: () => void
  children?: any
}

const ProfileToggle: React.FC<ProfileToggleProps> = ({
  isOpen = false,
  title,
  complete,
  children,
  onToggle,
}: ProfileToggleProps) => {
  return (
    <div className={styles.container} data-test="profile-toggle">
      <div
        className={styles.head}
        aria-expanded={complete}
        role="button"
        tabIndex={1}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            onToggle()
          }
        }}
        onClick={onToggle}
      >
        <h5 className={styles.heading}>{title}</h5>
        <div className="flex items-center">
          <div className={styles.status} data-test="profile-toggle-status">
            {complete ? <MdCheck className={styles.check} /> : <MdClose className={styles.times} />}
            {complete ? 'Complete' : 'Incomplete'}
          </div>
          <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
            <MdKeyboardArrowDown />
          </span>
        </div>
      </div>
      {isOpen && <div className={styles.body}>{children}</div>}
    </div>
  )
}

export default ProfileToggle
