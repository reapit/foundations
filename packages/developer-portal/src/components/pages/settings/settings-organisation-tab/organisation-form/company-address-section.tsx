import * as React from 'react'
import { Grid, Input, GridItem, SelectBox } from '@reapit/elements'
import { formFields } from './form-schema/form-fields'
import { COUNTRY_OPTIONS } from './country-options-list'

export type CompanyAddressSectionProps = {}

const {
  buildingNameField,
  buildingNumberField,
  line1Field,
  line2Field,
  line3Field,
  line4Field,
  countryIdField,
  postcodeField,
} = formFields

const CompanyAddressSection: React.FC<CompanyAddressSectionProps> = () => {
  return (
    <>
      <Grid>
        <GridItem>
          <Input
            type="text"
            labelText={buildingNameField.label}
            id={buildingNameField.name}
            name={buildingNameField.name}
          />
        </GridItem>
        <GridItem>
          <Input
            type="text"
            labelText={buildingNumberField.label}
            id={buildingNumberField.name}
            name={buildingNumberField.name}
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input type="text" labelText={line1Field.label} id={line1Field.name} name={line1Field.name} />
        </GridItem>
        <GridItem>
          <Input type="text" labelText={line2Field.label} id={line2Field.name} name={line2Field.name} />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input type="text" labelText={line3Field.label} id={line3Field.name} name={line3Field.name} />
        </GridItem>
        <GridItem>
          <Input type="text" labelText={line4Field.label} id={line4Field.name} name={line4Field.name} />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input type="text" labelText={postcodeField.label} id={postcodeField.name} name={postcodeField.name} />
        </GridItem>
        <GridItem>
          <SelectBox
            id={countryIdField.name}
            name={countryIdField.name}
            options={COUNTRY_OPTIONS}
            labelText={countryIdField.label}
          />
        </GridItem>
      </Grid>
    </>
  )
}

export default CompanyAddressSection
