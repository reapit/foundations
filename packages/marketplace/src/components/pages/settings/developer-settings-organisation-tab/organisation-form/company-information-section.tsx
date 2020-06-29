import * as React from 'react'
import { H3, Grid, Input, GridItem, TextArea, ImageInput, Checkbox } from '@reapit/elements'
import { formFields } from './form-schema/form-fields'
import { OrganisationFormValues } from './organisation-form'

export type CompanyInformationSectionProps = {
  formValues: OrganisationFormValues
}

const {
  aboutField,
  companyNameField,
  iconImageUrlField,
  vatNumberField,
  noVatNumberField,
  officeEmailField,
  regField,
  noRegField,
  telField,
  websiteField,
  nationalInsuranceNumberField,
} = formFields

const CompanyInformationSection: React.FC<CompanyInformationSectionProps> = ({ formValues }) => {
  const { noVatNumber, noReg } = formValues
  const isVATNumberFieldDisabled = Boolean(noVatNumber)
  const isRegFieldDisabled = Boolean(noReg)
  const isNationalInsuranceNumberFieldVisible = isVATNumberFieldDisabled || isRegFieldDisabled

  return (
    <>
      <H3>Company Information</H3>
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
          <Input type="text" labelText={telField.label} id={telField.name} name={telField.name} />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input type="text" labelText={websiteField.label} id={websiteField.name} name={websiteField.name} />
        </GridItem>
        <GridItem>
          <Input
            type="text"
            labelText={officeEmailField.label}
            id={officeEmailField.name}
            name={officeEmailField.name}
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input
            type="text"
            labelText={vatNumberField.label}
            id={vatNumberField.name}
            name={vatNumberField.name}
            disabled={isVATNumberFieldDisabled}
          />
          <Checkbox name={noVatNumberField.name} id={noVatNumberField.name} labelText={noVatNumberField.label || ''} />
        </GridItem>
        <GridItem>
          <Input
            type="text"
            labelText={regField.label}
            id={regField.name}
            name={regField.name}
            disabled={isRegFieldDisabled}
          />
          <Checkbox name={noRegField.name} id={noRegField.name} labelText={noRegField.label || ''} />
        </GridItem>
      </Grid>
      {isNationalInsuranceNumberFieldVisible && (
        <Grid>
          <GridItem className="is-half">
            <Input
              type="text"
              labelText={nationalInsuranceNumberField.label}
              id={nationalInsuranceNumberField.name}
              name={nationalInsuranceNumberField.name}
            />
          </GridItem>
        </Grid>
      )}
      <Grid>
        <GridItem>
          <TextArea labelText={aboutField.label} name={aboutField.name} id={aboutField.name} />
        </GridItem>
        <GridItem>
          <div className="control">
            <label className="label">Logo</label>
            <ImageInput
              id={iconImageUrlField.name}
              labelText={iconImageUrlField.label || ''}
              name={iconImageUrlField.name}
              allowClear
            />
          </div>
        </GridItem>
      </Grid>
    </>
  )
}

export default CompanyInformationSection
