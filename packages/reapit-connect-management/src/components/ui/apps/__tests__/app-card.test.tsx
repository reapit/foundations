import * as React from 'react'
import { mount } from 'enzyme'
import AppCard, { handleNavigation } from '../app-card'
import { history } from '../../../../core/router'
import Routes from '../../../../constants/routes'

describe('AppCard', () => {
  it('should match a snapshot', () => {
    const stubApp = { name: 'APP_NAME', developer: 'APP_DEVELOPER' }
    expect(mount(<AppCard app={stubApp} />)).toMatchSnapshot()
  })
})

describe('handleNavigation', () => {
  it('should navigate to the app/:id page', () => {
    const historySpy = jest.spyOn(history, 'push')
    const stubAppId = 'SOME_ID'

    const curried = handleNavigation(stubAppId)
    curried()
    expect(historySpy).toHaveBeenCalledWith(`${Routes.MARKETPLACE}/${stubAppId}`)
  })
})
