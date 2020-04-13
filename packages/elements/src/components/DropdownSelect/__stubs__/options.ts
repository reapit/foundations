import { SelectOption } from '../'

export const options: SelectOption[] = [
  {
    value: 'Property',
    label: 'Property',
    description: `The type of Property will be given to an application that can be launched for a 
      specific property from Agency Cloud. `,
    link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-1',
  },
  {
    value: 'Applicant',
    label: 'Applicant',
    description: `The type of Applicant will be given to an application that can be launched for a 
      specific applicant from Agency Cloud.`,
    link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#applicant',
  },
  {
    value: 'idCheck',
    label: 'Id Check',
    description: `The type of ID Check will be given to an application that can be used to replace 
      the ID Check screen in Agency Cloud.`,
    link: 'https://foundations-documentation.reapit.cloud/api/desktop-api#id-check',
  },
]
