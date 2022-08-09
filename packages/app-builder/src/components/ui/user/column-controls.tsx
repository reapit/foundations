import { styled } from '@linaria/react'
import { Label } from '@reapit/elements'
import React from 'react'
import { ToolbarCheckbox } from '../toolbar/toolbar-checkbox'
import { friendlyIdName } from './ejectable/utils'

const CheckboxContainer = styled.div<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  background: ${({ checked }) => {
    return checked ? '#EAF5FC' : 'white'
  }};
  color: ${({ checked }) => {
    return checked ? 'black' : 'inherit'
  }};
  border: ${({ checked }) => {
    return checked ? '1px solid #23A4DE' : '1px solid transparent'
  }};
  padding: 8px 12px;
  border-radius: 4px;

  label {
    margin-left: 8px;
    cursor: pointer;
  }
  height: 36px;
`

const ColumnControlLabel = styled(Label)`
  display: flex;
  margin-bottom: 8px;
`

const FieldContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const ColumnControls = ({
  availableFields,
  includedFields = [],
  setIncludedFields,
}: {
  availableFields: { name: string; isRequired: boolean }[]
  includedFields?: string[]
  setIncludedFields: (fields: string[]) => void
}) => (
  <div>
    <ColumnControlLabel>Fields</ColumnControlLabel>
    <FieldContainer>
      {availableFields
        .filter(({ name }) => name !== 'id')
        .map(({ name, isRequired }) => {
          const checked = includedFields.includes(name)
          return (
            <CheckboxContainer
              key={name}
              checked={checked}
              onClick={() => {
                if (isRequired) {
                  return
                }
                const newFields = !checked ? [...includedFields, name] : includedFields.filter((f) => f !== name)
                setIncludedFields(newFields)
              }}
              style={isRequired ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
            >
              <ToolbarCheckbox
                key={name}
                value={checked}
                onChange={(newChecked) => {
                  if (isRequired) {
                    return
                  }
                  const newFields = newChecked ? [...includedFields, name] : includedFields.filter((f) => f !== name)
                  setIncludedFields(newFields)
                }}
              />
              <Label>{friendlyIdName(name)}</Label>
            </CheckboxContainer>
          )
        })}
    </FieldContainer>
  </div>
)
