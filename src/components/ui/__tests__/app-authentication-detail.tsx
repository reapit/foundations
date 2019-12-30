import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppAuthenticationDetail, AppAuthenticationDetailProps, mapDispatchToProps } from '../app-authentication-detail'
import { requestAuthenticationCode } from '../../../actions/app-detail'

const props: AppAuthenticationDetailProps = {
  appId: '45001c67-fd1d-467b-865f-360d5a189e6f',
  loading: false,
  code: '',
  requestAuthenticationCode: jest.fn(),
  showError: jest.fn()
}

describe('AppAuthenticationDetail', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AppAuthenticationDetail {...props} />))).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    it('should dispatch correctly if mapped requestAuthenticationCode is called', () => {
      const mockedDispatch = jest.fn()
      const { requestAuthenticationCode: requestAuthenticationCodeFunc } = mapDispatchToProps(mockedDispatch)
      requestAuthenticationCodeFunc(props.appId)
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, requestAuthenticationCode(props.appId))
    })
  })
})
