import * as React from 'react'
import menuStyles from '@/styles/blocks/menu.scss?mod'

const { toggle } = menuStyles

export interface ToggleProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isChecked: boolean
}

const Toggle: React.SFC<ToggleProps> = React.memo(({ onChange, isChecked }) => (
  <>
    <label className={toggle}>
      <input type="checkbox" onChange={onChange} checked={isChecked} />
      <div>
        <div>
          <span />
          <span />
        </div>
        <svg>
          <use xlinkHref="#path" />
        </svg>
        <svg>
          <use xlinkHref="#path" />
        </svg>
      </div>
    </label>
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" id="path">
        <path d="M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22" />
      </symbol>
    </svg>
  </>
))

export default Toggle
