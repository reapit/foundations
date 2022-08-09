import React from 'react'
import { styled } from '@linaria/react'

const StyledToolbarCheckbox = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  /* Neutral/Medium Grey */

  border: 1px solid #e3e3e3;
  border-radius: 4px;
  width: 20px;
  height: 20px;

  cursor: pointer;
  box-sizing: border-box;

  background: ${({ checked }) => {
    return checked ? '#23a4de' : '#f2f2f2'
  }};
`

export const ToolbarCheckbox = ({ value, onChange }: { value: boolean; onChange?: (newValue: boolean) => void }) => (
  <StyledToolbarCheckbox
    checked={value}
    onClick={(e) => {
      e.stopPropagation()
      onChange && onChange(!value)
    }}
  >
    {value && (
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_312_7298)">
          <path
            d="M11.3533 0.656339C11.218 0.522106 10.9983 0.522106 10.863 0.656339L4.37084 8.21727L1.14269 5.01998C1.00749 4.88574 0.787774 4.88574 0.652486 5.01998C0.517287 5.1543 0.517287 5.37245 0.652486 5.50668L4.11726 8.93891C4.18486 9.00603 4.26938 9.03963 4.36236 9.03963C4.44688 9.03963 4.53987 9.00603 4.60746 8.93891L11.345 1.14304C11.4886 1.00881 11.4885 0.790661 11.3533 0.656339Z"
            fill="#fff"
            stroke="#fff"
            strokeWidth="0.5"
          />
        </g>
        <defs>
          <clipPath id="clip0_312_7298">
            <rect width="12" height="9.81818" fill="#23A4DE" />
          </clipPath>
        </defs>
      </svg>
    )}
  </StyledToolbarCheckbox>
)
