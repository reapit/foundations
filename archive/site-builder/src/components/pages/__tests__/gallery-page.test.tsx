import * as React from 'react'
import { shallow } from 'enzyme'
import GalleryPage from '../gallery-page'
import { AuthContext } from '@/context'
import { mockContext } from '@/context/__mocks__/mock-context'
import { Button } from '@reapit/elements'
import { clipboardCopy } from '@/utils/clipboard-copy'
import { reapitAndSons } from '@/assets/html/reapit-and-sons'

jest.mock('@/utils/clipboard-copy')
jest.mock('@reapit/elements')

describe('GalleryPage', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <AuthContext.Provider value={mockContext}>
          <GalleryPage />
        </AuthContext.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should call clipboardCopy correctly onClick', () => {
    const button = shallow(<GalleryPage />)
      .find(Button)
      .first()

    button.simulate('click')

    expect(clipboardCopy).toHaveBeenCalledWith(reapitAndSons)
  })
})
