import * as React from 'react'
import { shallow } from 'enzyme'
import Loader, { SpinnerSize } from '../loader'

describe('Loader', () => {
  it('should match a snapshot when isLoading=true', () => {
    expect(shallow(<Loader isLoading={true} />)).toMatchSnapshot()
  })
  it('should match a snapshot when isLoading=false', () => {
    expect(shallow(<Loader isLoading={false} />)).toMatchSnapshot()
  })
  it('should match a snapshot when description=test', () => {
    expect(shallow(<Loader description="test" />)).toMatchSnapshot()
  })
  it('should match a snapshot when indicator=test', () => {
    expect(shallow(<Loader indicator="test" />)).toMatchSnapshot()
  })
  it('should match a snapshot when wrapperClassName=test', () => {
    expect(shallow(<Loader wrapperClassName="test" />)).toMatchSnapshot()
  })
  it('should match a snapshot when children is defined', () => {
    expect(
      shallow(
        <Loader>
          <div>content</div>
        </Loader>,
      ),
    ).toMatchSnapshot()
  })
  it('should match a snapshot when size=small', () => {
    expect(shallow(<Loader size={SpinnerSize.SMALL} />)).toMatchSnapshot()
  })
  it('should match a snapshot when size=default', () => {
    expect(shallow(<Loader size={SpinnerSize.DEFAILT} />)).toMatchSnapshot()
  })
  it('should match a snapshot when size=large', () => {
    expect(shallow(<Loader size={SpinnerSize.LARGE} />)).toMatchSnapshot()
  })
})
