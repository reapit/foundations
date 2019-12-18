import * as React from 'react'
import { match } from 'react-router'
import toJson from 'enzyme-to-json'
import { shallow, mount, render } from 'enzyme'
import { getMockRouterProps } from '@/utils/mock-helper'
import { SubmitApp, SubmitAppProps, renderScopesCheckbox, SubmitAppMappedActions } from '../developer-submit-app'
import { appDetailDataStub } from '../../../sagas/__stubs__/app-detail'
import { appCategorieStub } from '../../../sagas/__stubs__/app-categories'

const submitAppMappedActionsProps: SubmitAppMappedActions = {
  submitApp: jest.fn(),
  submitAppSetFormState: jest.fn(),
  submitRevision: jest.fn(),
  submitRevisionSetFormState: jest.fn()
}

const mockRouterProps = getMockRouterProps(null)

describe('DeveloperSubmitApp', () => {
  it('should match a snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: false, error: false, appDetailData: null },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'PENDING'
      },
      developerId: '',
      match: {} as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })

  it('should show when fetch data loading', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: true, error: false, appDetailData: null },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: { loading: true, submitAppData: null, formState: 'PENDING' },
      developerId: null,
      match: {} as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    const wrapper = shallow(<SubmitApp {...props} />)
    expect(wrapper.find('Loader')).toHaveLength(1)
  })

  it('should match submit revision form snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'PENDING'
      },
      developerId: '2',
      match: {
        params: {
          appid: '1'
        }
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })

  it('should match snapshot when there are two app images', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'PENDING'
      },
      developerId: '2',
      match: {
        params: {
          appid: '1'
        }
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    const wrapper = render(<SubmitApp {...props} />)
    const screenshot1Value = wrapper.find('#screenshot1+span+span>a') // see css selectors
    const screenshot2Value = wrapper.find('#screenshot2+span+span>a') // see css selectors

    expect(screenshot1Value).toBeDefined()
    expect(screenshot2Value).toBeDefined()
  })

  it('should match submit revision form when appDetailState is loading snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: true, error: false, appDetailData: null },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'PENDING'
      },
      developerId: '2',
      match: {
        params: {
          appid: '1'
        }
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })

  it('should match submit revision form when appDetailState is having errors snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: false, error: true, appDetailData: null },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'PENDING'
      },
      developerId: '2',
      match: {
        params: {
          appid: '1'
        }
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })

  it('should match submit revision form when appDetailState is having null snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: false, error: false, appDetailData: null },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'PENDING'
      },
      developerId: '2',
      match: {
        params: {
          appid: '1'
        }
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })

  it('should match submit app successfully snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: false, error: false, appDetailData: null },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'SUCCESS'
      },
      developerId: '2',
      match: {} as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })

  it('should match submit revision successfully snapshot', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: false, error: false, appDetailData: null },
      submitRevisionState: { formState: 'SUCCESS' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'PENDING'
      },
      developerId: '2',
      match: {
        params: {
          appid: '1'
        }
      } as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    expect(toJson(shallow(<SubmitApp {...props} />))).toMatchSnapshot()
  })

  it('should show enough scope checkbox', () => {
    const props: SubmitAppProps = {
      ...submitAppMappedActionsProps,
      appDetailState: { loading: true, error: false, appDetailData: null },
      submitRevisionState: { formState: 'PENDING' },
      submitAppState: {
        loading: false,
        submitAppData: {
          scopes: [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
        },
        formState: 'SUBMITTING'
      },
      developerId: null,
      match: {} as match<{ appid?: string }>,
      history: mockRouterProps.history,
      location: mockRouterProps.location,
      categories: appCategorieStub?.data || []
    }

    const wrapper = mount(<SubmitApp {...props} />)
    expect(wrapper.find('Checkbox')).toHaveLength(2)
  })
})

describe('renderScopesCheckbox run correctly', () => {
  it('when renderScopesCheckBox have scope', () => {
    const scopes = [
      { name: 'AgencyCloud/properties.read', description: 'Read data about properties' },
      { name: 'AgencyCloud/properties.write', description: 'Write data about developers' }
    ]
    const checkboxes = renderScopesCheckbox(scopes)
    expect(checkboxes).toHaveLength(2)
  })

  it('when renderScopesCheckBox have scope', () => {
    const scopes = [{ name: 'AgencyCloud/properties.read', description: 'Read data about properties' }]
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
