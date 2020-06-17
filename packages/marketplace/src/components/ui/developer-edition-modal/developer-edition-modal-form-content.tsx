import * as React from 'react'

import { FlexContainerBasic, DropdownSelect, Button, LevelRight, SelectOption, ModalProps } from '@reapit/elements'
import { formFields } from './form-fields'

const { developerList } = formFields

export type DeveloperEditionModalFormContentProps = Pick<ModalProps, 'afterClose'> & {
  dropdownOptions: SelectOption[]
}

export const DeveloperEditionModalFormContent: React.FC<DeveloperEditionModalFormContentProps> = ({
  dropdownOptions,
  afterClose,
}) => {
  return (
    <FlexContainerBasic hasBackground hasPadding flexColumn>
      <DropdownSelect
        mode="multiple"
        options={dropdownOptions}
        name={developerList.name}
        id={developerList.name}
        placeholder={developerList.placeHolder}
        fixedPosition
        hasLabel={false}
      />
      <LevelRight>
        <Button variant="secondary" onClick={afterClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Confirm Subscription
        </Button>
      </LevelRight>
    </FlexContainerBasic>
  )
}

export default DeveloperEditionModalFormContent
