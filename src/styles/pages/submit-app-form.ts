import styled from 'styled-components'
import colors from '../variables/colors'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const FormWrapper = styled.div<{ disabled: boolean }>`
  background-color: ${colors.white};
  width: 100%;
  max-width: 420px;
  padding: 30px;
  border-radius: 8px;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  > .nav-tabs {
    margin-bottom: 1rem;
  }
`
