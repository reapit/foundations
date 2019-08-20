import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SubmitApp, SubmitAppProps, renderScopesCheckbox } from '../developer-submit-app'

describe('DeveloperSubmitApp', () => {
  it('should match a snapshot', () => {
    const props: SubmitAppProps = {
      submitApp: jest.fn(),
      submitAppSetFormState: jest.fn(),
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }]
        },
        formState: 'DONE'
      },
      developerId: null
    }
    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })

  it('should show when fetch data loading', () => {
    const props: SubmitAppProps = {
      submitApp: jest.fn(),
      submitAppSetFormState: jest.fn(),
      submitAppState: {
        loading: true,
        submitAppData: null,
        formState: 'PENDING'
      },
      developerId: null
    }
    const wrapper = shallow(<SubmitApp {...props} />)
    expect(wrapper.find('Loader')).toHaveLength(1)
  })

  it('should show CallToAction when form state SUCCESS', () => {
    const props: SubmitAppProps = {
      submitApp: jest.fn(),
      submitAppSetFormState: jest.fn(),
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }]
        },
        formState: 'SUCCESS'
      },
      developerId: null
    }
    const wrapper = shallow(<SubmitApp {...props} />)
    expect(wrapper.find('[dataTest="submit-success-section"]')).toHaveLength(1)
  })

  it('should disabled form when submit form', () => {
    const props: SubmitAppProps = {
      submitApp: jest.fn(),
      submitAppSetFormState: jest.fn(),
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }]
        },
        formState: 'SUBMITTING'
      },
      developerId: null
    }
    const wrapper = shallow(<SubmitApp {...props} />)
    expect(wrapper.find('[data-test="app-input-form"]').prop('className')).toEqual('undefined container disabled')
  })

  it('should disabled submit button when submit form', () => {
    const props: SubmitAppProps = {
      submitApp: jest.fn(),
      submitAppSetFormState: jest.fn(),
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }]
        },
        formState: 'SUBMITTING'
      },
      developerId: null
    }
    const wrapper = mount(<SubmitApp {...props} />)
    expect(wrapper.find('[data-test="submit-app-button"]').prop('disabled')).toEqual(true)
  })

  it('should show enough scope checkbox', () => {
    const props: SubmitAppProps = {
      submitApp: jest.fn(),
      submitAppSetFormState: jest.fn(),
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }]
        },
        formState: 'PENDING'
      },
      developerId: null
    }
    const wrapper = mount(<SubmitApp {...props} />)
    expect(wrapper.find('Checkbox')).toHaveLength(1)
  })

  describe('renderScopesCheckbox run correctly', () => {
    it('when renderScopesCheckBox have scope', () => {
      const scopes = [
        { name: 'Marketplace/developers.read', description: 'Read data about developers' },
        { name: 'Marketplace/developers.write', description: 'Write data about developers' }
      ]
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(2)
    })
    it('when renderScopesCheckBox have scope', () => {
      const scopes = [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }]
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(1)
    })

    it('when renderScopesCheckBox have no scopes', () => {
      const scopes = undefined
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(0)
    })
    it('when renderScopesCheckBox have [] scopes', () => {
      const scopes = []
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(0)
    })
    it('when renderScopesCheckBox have null scopes', () => {
      const scopes = []
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(0)
    })
  })
})
