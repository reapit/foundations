import React from 'react'
import { AppsList } from '..'
import { render, setViewport } from '../../../../tests/react-testing'

jest.mock('../../state/use-app-state')

describe('AppsList', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsList />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<AppsList />)).toMatchSnapshot()
  })
})
