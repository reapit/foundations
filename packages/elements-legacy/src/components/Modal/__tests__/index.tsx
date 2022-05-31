import * as React from 'react'
import { render } from '@testing-library/react'
import { ModalFooter, ModalBody, ModalHeader } from '../index'

describe('Modal', () => {
  it('should match a snapshot for ModalFooter', () => {
    expect(render(<ModalFooter footerItems={<div>Some footer content</div>} />)).toMatchSnapshot()
  })

  it('should match a snapshot for ModalBody', () => {
    expect(render(<ModalBody body={<div>Some body content</div>} />)).toMatchSnapshot()
  })

  it('should match a snapshot for ModalHeader', () => {
    expect(render(<ModalHeader title="Some body content" afterClose={jest.fn()} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
