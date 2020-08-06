import React from 'react'
import { FormSection, FormHeading, FormSubHeading, Checkbox } from '@reapit/elements'

type OfficeCheckboxesProps = {
  offices: any[]
}

const OfficeCheckboxes: React.FC<OfficeCheckboxesProps> = props => {
  const { offices } = props

  const officeCheckboxes = offices.map(office => {
    return <Checkbox name={`office-${office.id}`} id={`office-${office.id}`} labelText={office.name} key={office.id} />
  })

  return (
    <FormSection>
      <FormHeading>Offices</FormHeading>
      <FormSubHeading>
        Only properties from the selected offices will be shown in your Property Projector.
      </FormSubHeading>
      {officeCheckboxes}
    </FormSection>
  )
}

export default OfficeCheckboxes
