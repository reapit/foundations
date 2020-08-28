import React from 'react'
import { FormSection, FormHeading, FormSubHeading, Checkbox, Grid, GridItem } from '@reapit/elements'

type OfficeCheckboxesProps = {
  offices: any[]
}

const OfficeCheckboxes: React.FC<OfficeCheckboxesProps> = props => {
  const { offices } = props

  return (
    <FormSection>
      <FormHeading>Offices</FormHeading>
      <FormSubHeading>
        Only properties from the selected offices will be shown in your Property Projector.
      </FormSubHeading>
      <Grid>
        <GridItem className="office-checkbox">
          {offices.map(office => {
            return (
              <Checkbox
                name={`offices`}
                id={`office-${office.id}`}
                labelText={office.name}
                value={office.id}
                key={office.id}
              />
            )
          })}
        </GridItem>
      </Grid>
    </FormSection>
  )
}

export default OfficeCheckboxes
