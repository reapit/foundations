import { styled } from '@linaria/react'
import { Button, Select } from '@reapit/elements'

export const AppBuilderIconButton = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  margin-left: 4px;
  margin-right: 4px;
  border: none;
  border-radius: 4px;

  svg {
    fill: white;
  }

  background: ${({ intent }) => {
    if (intent === 'primary') {
      return '#23A4DE'
    }

    return '#f2f2f2'
  }};
`

export const AppBuilderSelect = styled(Select)`
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  max-width: 297px;
  margin-right: 4px;

  &:focus {
    border-bottom-color: #e3e3e3;
  }
`
