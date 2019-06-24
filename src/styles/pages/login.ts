import styled from 'styled-components'
import colors from '../variables/colors'

export const LoginContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.greyLightest};
  padding: 20px;
`

export const LoginFormWrapper = styled.div`
  background-color: ${colors.white};
  width: 100%;
  max-width: 420px;
  padding: 30px;
  border-radius: 8px;
`
