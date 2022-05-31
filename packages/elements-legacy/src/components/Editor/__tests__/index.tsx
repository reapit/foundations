import * as React from 'react'
import { render } from '@testing-library/react'
import { Editor, EditorProps } from '../index'
import { Formik } from 'formik'

const defaultProps = {
  onChange: () => {},
  defaultContent: '<b>Editor</b>',
  containerClass: 'pell-container',
  actionbarClass: 'pell-actionbar',
  buttonClass: 'pell-button',
  contentClass: 'pell-content',
  actions: undefined,
} as EditorProps

describe('Editor', () => {
  it('should match a snapshot', () => {
    const mounted = render(
      <Formik initialValues={{}} onSubmit={jest.fn()} render={() => <Editor {...defaultProps} />} />,
    )
    expect(mounted).toMatchSnapshot()
  })
})
