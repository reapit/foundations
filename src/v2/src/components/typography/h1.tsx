import styled from 'styled-components'
import { TYPOGRAPHY_TITLE_FONT_COLOR } from '../../styles'

export const H1 = styled.h1`
  color: ${props => props.theme.h1.color}
  font-size: 1em;
`

H1.defaultProps = {
  theme: {
    h1: {
      color: TYPOGRAPHY_TITLE_FONT_COLOR
    }
  }
}

export default H1
