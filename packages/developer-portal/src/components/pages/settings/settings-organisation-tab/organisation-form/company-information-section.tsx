import * as React from 'react'
import { Grid, Input, GridItem, TextArea, Checkbox } from '@reapit/elements'
import { formFields, OrganisationFormValues } from './form-schema/form-fields'

export type CompanyInformationSectionProps = {
  formValues: OrganisationFormValues
}

const {
  aboutField,
  companyNameField,
  // iconImageUrlField,
  taxNumberField,
  noTaxRegistrationField,
  emailField,
  registrationNumberField,
  noRegistrationNumberField,
  telephoneField,
  websiteField,
  nationalInsuranceField,
} = formFields

const CompanyInformationSection: React.FC<CompanyInformationSectionProps> = ({ formValues }) => {
  const { noTaxRegistration, noRegistrationNumber } = formValues
  const isVATNumberFieldDisabled = noTaxRegistration
  const isRegFieldDisabled = noRegistrationNumber
  const isNationalInsuranceNumberFieldVisible = isRegFieldDisabled

  return (
    <>
      <Grid>
        <GridItem>
          <Input
            type="text"
            labelText={companyNameField.label}
            id={companyNameField.name}
            name={companyNameField.name}
          />
        </GridItem>
        <GridItem>
          <Input type="text" labelText={telephoneField.label} id={telephoneField.name} name={telephoneField.name} />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input type="text" labelText={websiteField.label} id={websiteField.name} name={websiteField.name} />
        </GridItem>
        <GridItem>
          <Input disabled type="text" labelText={emailField.label} id={emailField.name} name={emailField.name} />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input
            type="text"
            labelText={taxNumberField.label}
            id={taxNumberField.name}
            name={taxNumberField.name}
            disabled={isVATNumberFieldDisabled}
          />
          <Checkbox
            name={noTaxRegistrationField.name}
            id={noTaxRegistrationField.name}
            labelText={noTaxRegistrationField.label || ''}
          />
        </GridItem>
        <GridItem>
          <Input
            type="text"
            labelText={registrationNumberField.label}
            id={registrationNumberField.name}
            name={registrationNumberField.name}
            disabled={isRegFieldDisabled}
          />
          <Checkbox
            name={noRegistrationNumberField.name}
            id={noRegistrationNumberField.name}
            labelText={noRegistrationNumberField.label || ''}
          />
        </GridItem>
      </Grid>
      {isNationalInsuranceNumberFieldVisible && (
        <Grid>
          <GridItem className="is-half">
            <Input
              type="text"
              labelText={nationalInsuranceField.label}
              id={nationalInsuranceField.name}
              name={nationalInsuranceField.name}
            />
          </GridItem>
        </Grid>
      )}
      <Grid>
        <GridItem>
          <TextArea labelText={aboutField.label} name={aboutField.name} id={aboutField.name} />
        </GridItem>
        <GridItem />
        {/* <GridItem>
          <div className="control">
            <label className="label">Logo</label>
            <ImageInput
              id={iconImageUrlField.name}
              labelText={iconImageUrlField.label || ''}
              name={iconImageUrlField.name}
              allowClear
            />
          </div>
        </GridItem> */}
      </Grid>
    </>
  )
}

export default CompanyInformationSection
