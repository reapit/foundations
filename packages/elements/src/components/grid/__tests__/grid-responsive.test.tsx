import React from 'react'
import { render } from '../../../tests/react-testing'
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
    const wrapper = render(
      <MediaStateProvider>
        <GridResponsive>
          <p>I am child</p>
        </GridResponsive>
      </MediaStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('hould render with the correct classNames when supplied all props', () => {
    const wrapper = render(
      <MediaStateProvider>
        <GridResponsive
          colGapMobile={1}
          colGapTablet={2}
          colGapDesktop={3}
          colGapWideScreen={4}
          colGapSuperWideScreen={6}
          colGap4KScreen={8}
          rowGapMobile={1}
          rowGapTablet={2}
          rowGapDesktop={3}
          rowGapWideScreen={4}
          rowGapSuperWideScreen={6}
          rowGap4KScreen={8}
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
    const wrapper = render(
      <MediaStateProvider>
        <ColResponsive>
          <p>I am child</p>
        </ColResponsive>
      </MediaStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with the correct classNames when supplied all props', () => {
    const wrapper = render(
      <MediaStateProvider>
        <ColResponsive
          spanMobile={1}
          spanTablet={1}
          spanDesktop={1}
          spanWideScreen={1}
          spanSuperWideScreen={1}
          span4KScreen={1}
          offsetMobile={1}
          offsetTablet={1}
          offsetDesktop={1}
          offsetWideScreen={1}
          offsetSuperWideScreen={1}
          offset4KScreen={1}
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
    colGapSuperWideScreen: 6,
    colGap4KScreen: 8,
    rowGapMobile: 1,
    rowGapTablet: 2,
    rowGapDesktop: 3,
    rowGapWideScreen: 4,
    rowGapSuperWideScreen: 6,
    rowGap4KScreen: 8,
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

  it('should get the grid classes for isSuperWideScreen', () => {
    expect(getGridClasses(props, { isSuperWideScreen: true } as MediaType)).toEqual('el-col-gap6 el-row-gap6')
  })

  it('should get the grid classes for is4kScreen', () => {
    expect(getGridClasses(props, { is4KScreen: true } as MediaType)).toEqual('el-col-gap8 el-row-gap8')
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
    spanSuperWideScreen: 6,
    span4KScreen: 8,
    offsetMobile: 1,
    offsetTablet: 2,
    offsetDesktop: 3,
    offsetWideScreen: 4,
    offsetSuperWideScreen: 6,
    offset4KScreen: 8,
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

  it('should get the grid classes for isSuperWideScreen', () => {
    expect(getColClasses(props, { isSuperWideScreen: true } as MediaType)).toEqual('el-span6 el-offset6')
  })

  it('should get the grid classes for is4KScreen', () => {
    expect(getColClasses(props, { is4KScreen: true } as MediaType)).toEqual('el-span8 el-offset8')
  })

  it('should get the grid classes for unknown', () => {
    expect(getColClasses(props, {} as MediaType)).toBeNull()
  })
})
