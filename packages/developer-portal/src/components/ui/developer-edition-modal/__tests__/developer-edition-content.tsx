import React from 'react'
import { DeveloperEditionContent } from '../developer-edition-content'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { render } from '../../../../tests/react-testing'

jest.mock('../../../../core/use-global-state')

const developer = { value: 'value', label: 'label', description: 'description' } as Partial<DeveloperModel>

describe('DeveloperEditionContent', () => {
  it('should match snapshot', () => {
    const wrapper = render(
      <DeveloperEditionContent developer={developer} loading={false} handleOnConfirm={jest.fn()} desktopIsFree />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
