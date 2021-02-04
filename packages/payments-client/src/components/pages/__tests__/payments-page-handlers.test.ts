import { Routes } from '../../../constants/routes'
import { History } from 'history'
import { onSearchHandler, onPageChangeHandler, handleTakePayment } from '../payment-page-handlers'
import { history } from '../../../core/router'

jest.mock(
  '../../../core/router',
  () =>
    (({
      history: {
        push: jest.fn(),
      },
    } as unknown) as History<any>),
)

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useHistory: () => ({ push: jest.fn() }),
  useLocation: jest.fn(() => ({ search: '', pathname: '/test' })),
}))

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const onPageChangeHandlerFn = onPageChangeHandler(history, {})
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenLastCalledWith(`${Routes.PAYMENTS}?pageNumber=2`)
  })
})

describe('onSearchHandler', () => {
  const curried = onSearchHandler(history)

  it('should setStatus when has no query', () => {
    curried({ description: '' })
    expect(history.push).toHaveBeenCalledWith(`${Routes.PAYMENTS}`)
  })

  it('should push historyMock when has query', () => {
    curried({ description: 'description' })
    expect(history.push).toHaveBeenCalledWith(`${Routes.PAYMENTS}?pageNumber=1&description=description`)
  })
})

describe('handleTakePayment', () => {
  it('should correctly call history', () => {
    const historySpy = jest.spyOn(history, 'push')
    const paymentId = 'SOME_ID'
    handleTakePayment(paymentId)
    expect(historySpy).toHaveBeenCalledWith(`${Routes.PAYMENTS}/${paymentId}`)
  })
})
