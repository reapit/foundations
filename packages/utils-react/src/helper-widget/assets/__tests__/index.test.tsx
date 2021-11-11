import React from 'react'
import { render } from '@testing-library/react'
import { AppsIcon } from '../apps'
import { ChatIcon } from '../chat'
import { DataWarehouseIcon } from '../data-warehouse'
import { DesktopIcon } from '../desktop-api'
import { DocsIcon } from '../docs'
import { MarketplaceManagementIcon } from '../marketplace-management'
import { PowerBiIcon } from '../power-bi'
import { VideoIcon } from '../video'
import { WebsiteIcon } from '../website-integration'

describe('AppsIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsIcon />)).toMatchSnapshot()
  })
})

describe('ChatIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<ChatIcon />)).toMatchSnapshot()
  })
})

describe('DataWarehouseIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<DataWarehouseIcon />)).toMatchSnapshot()
  })
})

describe('DesktopIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<DesktopIcon />)).toMatchSnapshot()
  })
})

describe('DocsIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<DocsIcon />)).toMatchSnapshot()
  })
})

describe('MarketplaceManagementIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<MarketplaceManagementIcon />)).toMatchSnapshot()
  })
})

describe('PowerBiIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<PowerBiIcon />)).toMatchSnapshot()
  })
})

describe('VideoIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<VideoIcon />)).toMatchSnapshot()
  })
})

describe('WebsiteIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<WebsiteIcon />)).toMatchSnapshot()
  })
})
