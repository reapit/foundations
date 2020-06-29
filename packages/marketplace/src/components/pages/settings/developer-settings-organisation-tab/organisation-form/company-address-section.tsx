import * as React from 'react'
import { H3, Grid, Input, GridItem, SelectBox } from '@reapit/elements'
import { formFields } from './form-schema/form-fields'

export type CompanyAddressSectionProps = {}

const { line1Field, line2Field, line3Field, line4Field, countryIdField, postCodeField } = formFields

const CompanyAddressSection: React.FC<CompanyAddressSectionProps> = () => {
  return (
    <>
      <H3>Company Address</H3>
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
          <SelectBox
            id={countryIdField.name}
            name={countryIdField.name}
            options={[]}
            labelText={countryIdField.label}
          />
        </GridItem>
        <GridItem>
          <Input type="text" labelText={postCodeField.label} id={postCodeField.name} name={postCodeField.name} />
        </GridItem>
      </Grid>
    </>
  )
}

export default CompanyAddressSection
