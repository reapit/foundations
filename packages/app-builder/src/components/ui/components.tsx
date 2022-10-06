import { styled } from '@linaria/react'
import { Button, Select } from '@reapit/elements'
import React, { useEffect, useState } from 'react'

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

export const AppBuilderIconButtonWithText = styled(AppBuilderIconButton)<{ isActive: boolean }>`
  padding-left: 16px;
  padding-right: 16px;
  width: auto;
  margin: 0;

  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-transform: none;
  font-feature-settings: 'liga' off;

  color: ${({ isActive }) => {
    return isActive ? 'black' : '#646464'
  }};

  svg {
    margin-right: 6px;
    color: ${({ isActive }) => {
      return isActive ? '#23A4DE' : '#bebebe'
    }};
  }

  background: ${({ isActive }) => {
    return isActive ? '#EAF5FC' : 'white'
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
  style,
  className,
}: {
  children: React.ReactNode
  defaultValue: string
  style?: React.CSSProperties
  className?: string
  onInputSubmit: React.DOMAttributes<HTMLInputElement>['onSubmit']
}) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <SelectOrInputContainer style={style} className={className}>
      {children}
      <OverlayInput
        value={value}
        onSubmit={onInputSubmit}
        data-form-type="other" // stops extentions autofilling this field
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onInputSubmit && onInputSubmit(e)
          }
        }}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </SelectOrInputContainer>
  )
}

export const AppBuilderSelect = styled(Select)`
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  max-width: 297px;
  margin-right: 4px;
  font-size: 14px;

  &:focus {
    border-bottom-color: #e3e3e3;
  }
`

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  background: #f2f2f2;
  border-radius: 100px;

  cursor: pointer;
`

export const PlusButton = ({ loading, onClick }: { loading?: boolean; onClick: () => void }) => (
  <CircleButtonContainer
    onClick={(e) => {
      e.stopPropagation()
      if (!loading) {
        onClick()
      }
    }}
    style={{
      opacity: loading ? 0.5 : 1,
    }}
  >
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.57129 5.57129C9.84743 5.57129 10.0713 5.34743 10.0713 5.07129C10.0713 4.79515 9.84743 4.57129 9.57129 4.57129L5.57129 4.57129L5.57129 0.571289C5.57129 0.295147 5.34743 0.0712889 5.07129 0.0712888C4.79515 0.0712888 4.57129 0.295147 4.57129 0.571289L4.57129 4.57129L0.571289 4.57129C0.295147 4.57129 0.0712889 4.79515 0.0712888 5.07129C0.0712888 5.34743 0.295147 5.57129 0.571289 5.57129L4.57129 5.57129L4.57129 9.57129C4.57129 9.84743 4.79515 10.0713 5.07129 10.0713C5.34743 10.0713 5.57129 9.84743 5.57129 9.57129L5.57129 5.57129L9.57129 5.57129Z"
        fill="#646464"
      />
    </svg>
  </CircleButtonContainer>
)

export const MinusButton = ({ loading, onClick }: { loading?: boolean; onClick: () => void }) => (
  <CircleButtonContainer
    onClick={(e) => {
      e.stopPropagation()
      if (!loading) {
        onClick()
      }
    }}
    style={{
      opacity: loading ? 0.5 : 1,
    }}
  >
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 1.07129C10 1.34743 9.77614 1.57129 9.5 1.57129L0.5 1.57129C0.223858 1.57129 -3.39263e-08 1.34743 -2.18557e-08 1.07129C-9.78513e-09 0.795146 0.223858 0.571289 0.5 0.571289L9.5 0.571289C9.77614 0.571289 10 0.795147 10 1.07129Z"
        fill="#646464"
      />
    </svg>
  </CircleButtonContainer>
)
