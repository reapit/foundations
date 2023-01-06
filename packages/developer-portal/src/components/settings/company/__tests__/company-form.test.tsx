import React from 'react'
import { CompanyForm, handleRefreshDeveloper, handleUpdateDeveloper } from '../company-form'
import { render } from '../../../../tests/react-testing'
import { mockDeveloperModel } from '../../../../tests/__stubs__/developers'

describe('CompanyForm', () => {
  it('should match snapshot', () => {
    expect(render(<CompanyForm refreshDeveloper={jest.fn()} developer={mockDeveloperModel} />)).toMatchSnapshot()
  })
})

describe('handleRefreshDeveloper', () => {
  it('should refresh a developer on success', () => {
    const refreshDeveloper = jest.fn()
    const updateDeveloperSuccess = true

    const curried = handleRefreshDeveloper(refreshDeveloper, updateDeveloperSuccess)

    curried()

    expect(refreshDeveloper).toHaveBeenCalledTimes(1)
  })
})

describe('handleUpdateDeveloper', () => {
  it('should refresh a developer on success', () => {
    const updateDeveloper = jest.fn()

    const curried = handleUpdateDeveloper(mockDeveloperModel, updateDeveloper)

    const formValues = {
      company: 'UPDATED_COMPANY',
      telephone: 'UPDATED_TEL',
      website: 'UPDATED_SITE',
      email: 'UPDATED_EMAIL',
      notificationsEmail: 'UPDATED_NOTIFICATIONS_EMAIL',
      noTaxRegistration: false,
      taxNumber: 'UPDATED_TAX',
      noregistrationNumber: false,
      registrationNumber: 'UPDATED_REG',
      about: 'UPDATED_ABOUT',
      buildingName: 'UPDATED_BUILDING',
      buildingNumber: 'UPDATED_BUILDING_NO',
      line1: 'UPDATED_LINE_1',
      line2: 'UPDATED_LINE_2',
      line3: 'UPDATED_LINE_3',
      line4: 'UPDATED_LINE_4',
      postcode: 'UPDATED_PC',
      countryId: 'UPDATED_COUNTRY',
    }

    curried(formValues)

    expect(updateDeveloper).toHaveBeenCalledWith({
      ...mockDeveloperModel,
      companyName: formValues.company,
      telephone: formValues.telephone,
      website: formValues.website,
      notificationsEmail: formValues.notificationsEmail,
      noTaxRegistration: formValues.noTaxRegistration,
      taxNumber: formValues.taxNumber,
      registrationNumber: formValues.registrationNumber,
      about: formValues.about,
      companyAddress: {
        ...mockDeveloperModel.companyAddress,
        buildingName: formValues.buildingName,
        buildingNumber: formValues.buildingNumber,
        line1: formValues.line1,
        line2: formValues.line2,
        line3: formValues.line3,
        line4: formValues.line4,
        postcode: formValues.postcode,
        countryId: formValues.countryId,
      },
    })
  })
})
