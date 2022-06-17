import React from 'react'
import { Button } from '@reapit/elements'

import { useTypeList } from '@/components/hooks/objects/use-type-list'
import { useCreateCustomEntity } from '@/components/hooks/custom-entities/use-create-custom-entity'
import { ToolbarItem, ToolbarItemType } from '../toolbar'
import { styled } from '@linaria/react'

export type TypeListProps = {
  onChange?: (value: string) => void
}

const TypeListContainer = styled.div`
  display: flex;
  align-items: center;
`

export const TypeList = ({ onChange }: TypeListProps) => {
  const { data, loading } = useTypeList()
  const { createCustomEntity, loading: createLoading } = useCreateCustomEntity()

  return (
    <TypeListContainer>
      <ToolbarItem type={ToolbarItemType.Select} propKey="typeName" title="Type" onChange={onChange}>
        {(data || []).map((typeName) => (
          <option key={typeName} value={typeName}>
            {typeName}
          </option>
        ))}
        <option value="" disabled>
          {loading ? 'Loading...' : 'Select a Type'}
        </option>
      </ToolbarItem>
      <Button
        loading={createLoading}
        onClick={() => {
          const typeName = prompt('Enter the name of the new type')
          if (typeName) {
            createCustomEntity({
              id: typeName,
              name: typeName,
              fields: [],
            })
          }
        }}
      >
        Add New
      </Button>
    </TypeListContainer>
  )
}
