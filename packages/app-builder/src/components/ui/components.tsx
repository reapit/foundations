import { styled } from '@linaria/react'
import { Button, Select } from '@reapit/elements'
import React from 'react'

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

const SelectOrInputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  max-width: 297px;
`

const OverlayInput = styled.input`
  position: absolute;
  font-family: var(--font-sans-serif);
  font-size: 1rem;
  height: calc(2rem - 2px);
  border: none;
  margin: 1px;
  padding-left: 9px;
  width: 100%;
  max-width: 267px;
  background: white;
  :focus {
    outline: none;
  }
`

export const SelectOrInput = ({
  children,
  onInputSubmit,
  defaultValue,
}: {
  children: React.ReactNode
  defaultValue: string
  onInputSubmit: React.DOMAttributes<HTMLInputElement>['onSubmit']
}) => (
  <SelectOrInputContainer>
    {children}
    <OverlayInput
      defaultValue={defaultValue}
      onSubmit={onInputSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onInputSubmit && onInputSubmit(e)
        }
      }}
    />
  </SelectOrInputContainer>
)

export const AppBuilderSelect = styled(Select)`
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  max-width: 297px;
  margin-right: 4px;

  &:focus {
    border-bottom-color: #e3e3e3;
  }
`
