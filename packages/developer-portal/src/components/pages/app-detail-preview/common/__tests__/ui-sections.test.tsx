import * as React from 'react'
import { shallow, mount } from 'enzyme'
import {
  CategorySection,
  DesktopIntegrationSection,
  PrivateAppSection,
  DirectApiSection,
  StatusSection,
  BackToAppsSection,
  ListingPreviewSection,
  AuthenticationSection,
  SummarySection,
  DeveloperSection,
  DeveloperAboutSection,
  AdditionalImagesSection,
} from '../ui-sections'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import {
  DesktopIntegrationTypeModel,
  InstallationModel,
  MediaModel,
  ScopeModel,
} from '@reapit/foundations-ts-definitions'
import { Button } from '@reapit/elements'
import { InstallationsTableSection, PermissionsSection, DescriptionSection } from '../ui-sections'
import { installationsStub } from '@/sagas/__stubs__/installations'

describe('CategorySection', () => {
  it('should match a snapshot where category undefined and not sidebar', () => {
    expect(shallow(<CategorySection category={undefined} />)).toMatchSnapshot()
  })

  it('should match a snapshot where category is defined and is sidebar', () => {
    expect(shallow(<CategorySection category={appDetailDataStub.data?.category} isSidebar />)).toMatchSnapshot()
  })
})

describe('DesktopIntegrationSection', () => {
  it('should match a snapshot where desktopIntegrationTypes empty and not sidebar', () => {
    expect(shallow(<DesktopIntegrationSection desktopIntegrationTypes={[]} />)).toMatchSnapshot()
  })

  it('should match a snapshot where desktopIntegrationTypes hasLength and is sidebar', () => {
    expect(
      shallow(
        <DesktopIntegrationSection
          desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
          isSidebar
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('PrivateAppSection', () => {
  it('should match a snapshot where limitToClientIds empty and not sidebar', () => {
    expect(shallow(<PrivateAppSection limitToClientIds={[]} />)).toMatchSnapshot()
  })

  it('should match a snapshot where limitToClientIds hasLength and is sidebar', () => {
    expect(shallow(<PrivateAppSection limitToClientIds={['ID_ONE', 'ID_TWO']} isSidebar />)).toMatchSnapshot()
  })
})

describe('DirectApiSection', () => {
  it('should match a snapshot where isDirectApi false and not sidebar', () => {
    expect(shallow(<DirectApiSection isDirectApi={false} />)).toMatchSnapshot()
  })

  it('should match a snapshot where isDirectApi true and is sidebar', () => {
    expect(shallow(<DirectApiSection isDirectApi isSidebar />)).toMatchSnapshot()
  })
})

describe('StatusSection', () => {
  it('should match a snapshot where isListed false and not sidebar', () => {
    expect(shallow(<StatusSection isListed={false} />)).toMatchSnapshot()
  })

  it('should match a snapshot where isListed true and is sidebar', () => {
    expect(shallow(<StatusSection isListed isSidebar />)).toMatchSnapshot()
  })
})

describe('BackToAppsSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<BackToAppsSection onClick={jest.fn()} />)).toMatchSnapshot()
  })

  it('should respond to a button click', () => {
    const onClick = jest.fn()
    const button = shallow(<BackToAppsSection onClick={onClick} />)
      .find(Button)
      .first()

    button.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('ListingPreviewSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ListingPreviewSection onClick={jest.fn()} isSidebar />)).toMatchSnapshot()
  })

  it('should respond to a link click', () => {
    const onClick = jest.fn()
    const link = mount(<ListingPreviewSection onClick={onClick} />)
      .find('a')
      .first()

    link.simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('AuthenticationSection', () => {
  it('should match a snapshot where authFlow is CLIENT_SECRET and not sidebar', () => {
    expect(
      shallow(<AuthenticationSection authFlow="CLIENT_SECRET" id="SOME_ID" externalId="SOME_ID" />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where authFlow is USER_SESSION sidebar', () => {
    expect(
      shallow(<AuthenticationSection authFlow="USER_SESSION" id="SOME_ID" externalId="SOME_ID" isSidebar />),
    ).toMatchSnapshot()
  })
})

describe('SummarySection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<SummarySection summary="Lorem ipsum" />)).toMatchSnapshot()
  })
})

describe('InstallationsTableSection', () => {
  it('should render a table and match a snapshot when has data', () => {
    const wrapper = mount(
      <InstallationsTableSection data={installationsStub.data as InstallationModel[]} columns={[]} />,
    )
    expect(wrapper.find('[data-test="render-installations-table"]').length).toBe(1)
    expect(wrapper).toMatchSnapshot()
  })

  it('should not render a table when has no data', () => {
    const wrapper = mount(<InstallationsTableSection data={[]} columns={[]} />)
    expect(wrapper.find('[data-test="render-installations-table-empty-text"]').length).toBe(1)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('DeveloperSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperSection developer="Developer Name" isSidebar />)).toMatchSnapshot()
  })
})

describe('DeveloperAboutSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperAboutSection isSidebar />)).toMatchSnapshot()
  })
})

describe('AdditionalImagesSection', () => {
  it('should match a snapshot where has images', () => {
    expect(
      shallow(
        <AdditionalImagesSection
          images={appDetailDataStub.data?.media as MediaModel[]}
          splitIndex={0}
          numberImages={2}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where has no images', () => {
    expect(shallow(<AdditionalImagesSection images={[]} splitIndex={0} numberImages={2} />)).toMatchSnapshot()
  })
})

describe('PermissionsSection', () => {
  it('should match a snapshot where has permissions', () => {
    expect(
      shallow(<PermissionsSection permissions={appDetailDataStub.data?.scopes as ScopeModel[]} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where has no permissions', () => {
    expect(shallow(<PermissionsSection permissions={[]} />)).toMatchSnapshot()
  })
})

describe('DescriptionSection', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DescriptionSection description="Lorem ipsum" />)).toMatchSnapshot()
  })
})
