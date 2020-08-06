import React from 'react'
import { FormSection, FormHeading, FormSubHeading, Checkbox } from '@reapit/elements'

type DepartmentCheckboxesProps = {
  departments: any[]
}

const DepartmentCheckboxes: React.FC<DepartmentCheckboxesProps> = props => {
  const { departments } = props

  const departmentCheckboxes = departments.map(dep => {
    return (
      <React.Fragment key={dep.id}>
        <Checkbox name={`department-${dep.id}`} id={`department-${dep.id}`} labelText={dep.name} />
        <div className="department-property-types">
          {dep.propertyTypes.map((type, idx: number) => {
            return <Checkbox name={type.id} id={type.id} labelText={type.name} key={idx} />
          })}
        </div>
      </React.Fragment>
    )
  })

  return (
    <FormSection>
      <FormHeading>Departments</FormHeading>
      <FormSubHeading>
        Only properties from the selected departments and types will be shown in your Property Projector.
      </FormSubHeading>
      {departmentCheckboxes}
    </FormSection>
  )
}

export default DepartmentCheckboxes
