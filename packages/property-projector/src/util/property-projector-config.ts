import { PropertyProjectorConfig } from '@/types/global'
import { ReapitConnectSession } from '@reapit/connect-session'
import { getDepartments } from '../platform-api/departments-api'
import { getOffices } from '../platform-api/offices-api'

/**
 * @todo adjust so the departments/offices aren't limited by pagination
 */
export const getPropertyProjectorConfig = async (session: ReapitConnectSession) => {
  const propertyProjectorConfig: any = {
    logo: '',
    primaryColour: '',
    secondaryColour: '',
    rotationDuration: 0,
    refreshHour: 0,
    propertyLimit: 0,
    minPrice: 0,
    maxPrice: 0,
    randomize: false,
    showAddress: true,
    showStrapline: true,
    sortBy: 'created',
    departments: [],
    offices: [],
  }

  try {
    propertyProjectorConfig.departments = (await getDepartments(session))?._embedded?.map(department => {
      const { id, name, typeOptions } = department
      const propertyTypes = typeOptions?.map(type => {
        return {
          id: `${id}-${type}`,
          name: type,
          checked: false,
        }
      })

      return {
        id,
        name,
        checked: false,
        propertyTypes,
      }
    })

    propertyProjectorConfig.offices = (await getOffices(session))?._embedded?.map(department => {
      const { id, name } = department

      return {
        id,
        name,
        checked: false,
      }
    })
  } catch (error) {
    throw new Error(error)
  }

  return propertyProjectorConfig
}
