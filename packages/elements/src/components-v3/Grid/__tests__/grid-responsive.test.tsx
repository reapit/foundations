import * as React from 'react'
import { shallow } from 'enzyme'
import {
  ColResponsive,
  ColResponsiveProps,
  getColClasses,
  getGridClasses,
  GridResponsive,
  GridResponsiveProps,
} from '../grid-responsive'
import { MediaStateProvider, MediaType } from '../../../hooks/use-media-query'

describe('GridResponsive', () => {
  it('should match a snapshot and render children with no props', () => {
    const wrapper = shallow(
      <MediaStateProvider>
        <GridResponsive>
          <p>I am child</p>
        </GridResponsive>
      </MediaStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('hould render with the correct classNames when supplied all props', () => {
    const wrapper = shallow(
      <MediaStateProvider>
        <GridResponsive
          colGapMobile={1}
          colGapTablet={2}
          colGapDesktop={3}
          colGapWideScreen={4}
          rowGapMobile={1}
          rowGapTablet={2}
          rowGapDesktop={3}
          rowGapWideScreen={4}
        >
          <p>I am child</p>
        </GridResponsive>
      </MediaStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ColResponsive', () => {
  it('should match a snapshot and render children with no props', () => {
    const wrapper = shallow(
      <MediaStateProvider>
        <ColResponsive>
          <p>I am child</p>
        </ColResponsive>
      </MediaStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with the correct classNames when supplied all props', () => {
    const wrapper = shallow(
      <MediaStateProvider>
        <ColResponsive
          spanMobile={1}
          spanTablet={1}
          spanDesktop={1}
          spanWideScreen={1}
          offsetMobile={1}
          offsetTablet={1}
          offsetDesktop={1}
          offsetWideScreen={1}
        >
          <p>I am child</p>
        </ColResponsive>
      </MediaStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('getGridClasses', () => {
  const props = {
    colGapMobile: 1,
    colGapTablet: 2,
    colGapDesktop: 3,
    colGapWideScreen: 4,
    rowGapMobile: 1,
    rowGapTablet: 2,
    rowGapDesktop: 3,
    rowGapWideScreen: 4,
  } as GridResponsiveProps

  it('should get the grid classes for isMobile', () => {
    expect(getGridClasses(props, { isMobile: true } as MediaType)).toEqual('el-col-gap1 el-row-gap1')
  })

  it('should get the grid classes for isTablet', () => {
    expect(getGridClasses(props, { isTablet: true } as MediaType)).toEqual('el-col-gap2 el-row-gap2')
  })

  it('should get the grid classes for isDesktop', () => {
    expect(getGridClasses(props, { isDesktop: true } as MediaType)).toEqual('el-col-gap3 el-row-gap3')
  })

  it('should get the grid classes for isWideScreen', () => {
    expect(getGridClasses(props, { isWideScreen: true } as MediaType)).toEqual('el-col-gap4 el-row-gap4')
  })

  it('should get the grid classes for unknown', () => {
    expect(getGridClasses(props, {} as MediaType)).toBeNull()
  })
})

describe('getColClasses', () => {
  const props = {
    spanMobile: 1,
    spanTablet: 2,
    spanDesktop: 3,
    spanWideScreen: 4,
    offsetMobile: 1,
    offsetTablet: 2,
    offsetDesktop: 3,
    offsetWideScreen: 4,
  } as ColResponsiveProps

  it('should get the grid classes for isMobile', () => {
    expect(getColClasses(props, { isMobile: true } as MediaType)).toEqual('el-span1 el-offset1')
  })

  it('should get the grid classes for isTablet', () => {
    expect(getColClasses(props, { isTablet: true } as MediaType)).toEqual('el-span2 el-offset2')
  })

  it('should get the grid classes for isDesktop', () => {
    expect(getColClasses(props, { isDesktop: true } as MediaType)).toEqual('el-span3 el-offset3')
  })

  it('should get the grid classes for isWideScreen', () => {
    expect(getColClasses(props, { isWideScreen: true } as MediaType)).toEqual('el-span4 el-offset4')
  })

  it('should get the grid classes for unknown', () => {
    expect(getColClasses(props, {} as MediaType)).toBeNull()
  })
})
