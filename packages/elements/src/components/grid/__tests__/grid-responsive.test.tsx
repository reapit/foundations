import React from 'react'
import { render } from '@testing-library/react'
import { ColResponsive, GridResponsive } from '../grid-responsive'
import { MediaStateProvider } from '../../../hooks/use-media-query'

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
