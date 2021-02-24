import React from 'react'
import { css } from 'linaria'

const okayWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`

const okayContent = css`
  margin: 0 auto;
`

export const OkayPage: React.FC = () => (
  <div className={okayWrapper}>
    <div className={okayContent}>
      <h5 id="ok-content">It&apos;s ok, everything&apos;s fine 👍</h5>
    </div>
  </div>
)
