import * as React from 'react'
import { render } from '../../../tests/react-testing'

import AsyncContainer, { AsyncContainerProps } from '../async-container'

describe('AsyncContainer', () => {
  it('should match a snapshot when loading = true', () => {
    const props: AsyncContainerProps = {
      loading: true,
      error: false,
      data: [],
    }

    expect(render(<AsyncContainer {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when error = true', () => {
    const props: AsyncContainerProps = {
      loading: false,
      error: true,
      data: [],
    }

    expect(render(<AsyncContainer {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when data = null', () => {
    const props: AsyncContainerProps = {
      loading: false,
      error: false,
      data: null,
    }

    expect(render(<AsyncContainer {...props} />)).toMatchSnapshot()
  })
})
