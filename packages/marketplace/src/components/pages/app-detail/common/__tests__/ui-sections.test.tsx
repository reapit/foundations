import React from 'react'
import { render } from '../../../../../tests/react-testing'
import {
  CategorySection,
  DesktopIntegrationSection,
  PrivateAppSection,
  DirectApiSection,
  StatusSection,
  BackToAppsSection,
  ListingPreviewSection,
  SummarySection,
  AdditionalImagesSection,
} from '../ui-sections'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { desktopIntegrationTypesStub } from '@/sagas/__stubs__/desktop-integration-types'
import { DesktopIntegrationTypeModel, MediaModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import { PermissionsSection, DescriptionSection } from '../ui-sections'
import { categoriesStub } from '@/sagas/__stubs__/categories'

describe('CategorySection', () => {
  it('should match a snapshot where category undefined and not sidebar', () => {
    expect(render(<CategorySection category={undefined} />)).toMatchSnapshot()
  })

  it('should match a snapshot where category is defined and is sidebar', () => {
    expect(render(<CategorySection category={categoriesStub.data?.[0]} isSidebar />)).toMatchSnapshot()
  })
})

describe('DesktopIntegrationSection', () => {
  it('should match a snapshot where desktopIntegrationTypes empty and not sidebar', () => {
    expect(render(<DesktopIntegrationSection desktopIntegrationTypes={[]} />)).toMatchSnapshot()
  })

  it('should match a snapshot where desktopIntegrationTypes hasLength and is sidebar', () => {
    expect(
      render(
        <DesktopIntegrationSection
          desktopIntegrationTypes={desktopIntegrationTypesStub.data as DesktopIntegrationTypeModel[]}
          isSidebar
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('PrivateAppSection', () => {
  it('should match a snapshot where limitToClientIds empty and not sidebar', () => {
    expect(render(<PrivateAppSection limitToClientIds={[]} />)).toMatchSnapshot()
  })

  it('should match a snapshot where limitToClientIds hasLength and is sidebar', () => {
    expect(render(<PrivateAppSection limitToClientIds={['ID_ONE', 'ID_TWO']} isSidebar />)).toMatchSnapshot()
  })
})

describe('DirectApiSection', () => {
  it('should match a snapshot where isDirectApi false and not sidebar', () => {
    expect(render(<DirectApiSection isDirectApi={false} />)).toMatchSnapshot()
  })

  it('should match a snapshot where isDirectApi true and is sidebar', () => {
    expect(render(<DirectApiSection isDirectApi isSidebar />)).toMatchSnapshot()
  })
})

describe('StatusSection', () => {
  it('should match a snapshot where isListed false and not sidebar', () => {
    expect(render(<StatusSection isListed={false} />)).toMatchSnapshot()
  })

  it('should match a snapshot where isListed true and is sidebar', () => {
    expect(render(<StatusSection isListed isSidebar />)).toMatchSnapshot()
  })
})

describe('BackToAppsSection', () => {
  it('should match a snapshot', () => {
    expect(render(<BackToAppsSection onClick={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('ListingPreviewSection', () => {
  it('should match a snapshot', () => {
    expect(render(<ListingPreviewSection onClick={jest.fn()} isSidebar />)).toMatchSnapshot()
  })
})

describe('SummarySection', () => {
  it('should match a snapshot', () => {
    expect(render(<SummarySection summary="Lorem ipsum" />)).toMatchSnapshot()
  })
})

describe('AdditionalImagesSection', () => {
  it('should match a snapshot where has images', () => {
    expect(
      render(
        <AdditionalImagesSection
          images={appDetailDataStub.data.media as MediaModel[]}
          splitIndex={0}
          numberImages={2}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where has no images', () => {
    expect(render(<AdditionalImagesSection images={[]} splitIndex={0} numberImages={2} />)).toMatchSnapshot()
  })
})

describe('PermissionsSection', () => {
  it('should match a snapshot where has permissions', () => {
    expect(render(<PermissionsSection permissions={appDetailDataStub.data.scopes as ScopeModel[]} />)).toMatchSnapshot()
  })

  it('should match a snapshot where has no permissions', () => {
    expect(render(<PermissionsSection permissions={[]} />)).toMatchSnapshot()
  })
})

describe('DescriptionSection', () => {
  it('should match a snapshot', () => {
    expect(render(<DescriptionSection description="Lorem ipsum" />)).toMatchSnapshot()
  })
})
