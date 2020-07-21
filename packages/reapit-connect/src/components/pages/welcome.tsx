import * as React from 'react'
import { Section } from '@reapit/elements'
import logo from '@/assets/images/reapit-connect.png'
import { css } from 'linaria'

const welcomeStyles = css`
  color: red;
`
type LoginProps = {}
export const Welcome: React.FC<LoginProps> = () => {
  return (
    <Section className={welcomeStyles}>
      <img src={logo} alt="logo" />
      <p>Welcome to Reapit Foundations</p>
    </Section>
  )
}

export default Welcome
