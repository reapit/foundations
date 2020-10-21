import React from 'react'
import { FormSection, FormHeading, FormSubHeading, Checkbox } from '@reapit/elements'
import { Department } from '@/types/global'

type DepartmentCheckboxesProps = {
  departments: Department[]
}

const DepartmentCheckboxes: React.FC<DepartmentCheckboxesProps> = props => {
  const { departments } = props
  const departmentCheckboxes = departments.map(dep => {
    return (
      <React.Fragment key={dep.id}>
        <Checkbox name="departments" id={`department-${dep.id}`} value={dep.id} labelText={dep.name} />
        <div className="department-property-types">
          {dep.propertyTypes.map((type, idx: number) => {
            return (
              <Checkbox
                name={`${dep.id}PropertyTypes`}
                id={`${dep.id}-${type}`}
                value={type}
                labelText={type}
                key={idx}
              />
            )
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
