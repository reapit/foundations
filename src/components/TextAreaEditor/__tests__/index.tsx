import * as React from 'react'
import { shallow } from 'enzyme'
import { TextAreaEditor, TextAreaEditorProps } from '../index'
import toJson from 'enzyme-to-json'

const props: TextAreaEditorProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  placeholder: 'enter your name here'
}

describe('TextAreaEditor', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<TextAreaEditor {...props} />))).toMatchSnapshot()
  })
})
