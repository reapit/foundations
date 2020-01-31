import * as React from 'react'
import { shallow } from 'enzyme'
import {
  AppDetail,
  AppDetailProps,
  mapDispatchToProps,
  SlickButtonNav,
  ScopeGridThreeCol,
  sliceThreeItemEach,
} from '../app-detail'
import { setDeveloperAppModalStateDelete } from '@/actions/developer-app-modal'
import { setAppDetailModalStateInstall, setAppDetailModalStateUninstall } from '@/actions/app-detail-modal'

const props: AppDetailProps = {
  setDeveloperAppModalStateDelete: jest.fn(),
  setAppDetailModalStateInstall: jest.fn(),
  setAppDetailModalStateUninstall: jest.fn(),
  isCurrentLoggedUserDeveloper: true,
  isCurrentLoggedUserClient: false,
  data: {},
  afterClose: jest.fn(),
}

const scopes = [
  {
    name: 'agencyCloud/applicants.read',
    description: 'Read applicants',
  },
  {
    name: 'agencyCloud/companies.read',
    description: 'Read companies',
  },
  {
    name: 'agencyCloud/companies.read1',
    description: 'Read companies2',
  },
  {
    name: 'agencyCloud/companies.read2',
    description: 'Read companies2',
  },
  {
    name: 'agencyCloud/companies.read3',
    description: 'Read companies3',
  },
]

const scopeArrayItem = [
  [
    {
      name: 'agencyCloud/applicants.read',
      description: 'Read applicants',
    },
    {
      name: 'agencyCloud/companies.read',
      description: 'Read companies',
    },
    {
      name: 'agencyCloud/companies.read1',
      description: 'Read companies2',
    },
  ],
  [
    {
      name: 'agencyCloud/companies.read2',
      description: 'Read companies2',
    },
    {
      name: 'agencyCloud/companies.read3',
      description: 'Read companies3',
    },
  ],
]

describe('AppDetailModalInner', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AppDetail {...props} />)).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    it('should dispatch correctly if mapped setAppDetailModalStateInstall is called', () => {
      const mockedDispatch = jest.fn()
      const { setAppDetailModalStateInstall: mappedsetAppDetailModalStateViewConfirm } = mapDispatchToProps(
        mockedDispatch,
      )
      mappedsetAppDetailModalStateViewConfirm()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setAppDetailModalStateInstall())
    })

    it('should dispatch correctly if mapped requestUninstall is called', () => {
      const mockedDispatch = jest.fn()
      const { setAppDetailModalStateUninstall: mappedSetAppDetailModalStateUninstall } = mapDispatchToProps(
        mockedDispatch,
      )
      mappedSetAppDetailModalStateUninstall()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setAppDetailModalStateUninstall())
    })

    it('should dispatch correctly if mapped setDeveloperAppModalStateDelete is called', () => {
      const mockedDispatch = jest.fn()
      const { setDeveloperAppModalStateDelete: mappedSetDeveloperAppModalStateDelete } = mapDispatchToProps(
        mockedDispatch,
      )
      mappedSetDeveloperAppModalStateDelete()
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, setDeveloperAppModalStateDelete())
    })
  })
})

describe('SlickButtonNav', () => {
  it('should match snapshot', () => {
    const mockProps = {
      currentSlide: '',
      setAppDetailModalStateInstall: jest.fn(),
      slideCount: jest.fn(),
    }
    const wrapper = shallow(
      <SlickButtonNav {...mockProps}>
        <div>mockComponent</div>
      </SlickButtonNav>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('sliceThreeItemEach', () => {
  it('should return correctly', () => {
    expect(sliceThreeItemEach(scopes)).toEqual(scopeArrayItem)
  })
})

describe('ScopeGridThreeCol', () => {
  it('should match snapshot', () => {
    expect(shallow(<ScopeGridThreeCol scopeArrayItem={scopeArrayItem} />)).toMatchSnapshot()
  })
})
