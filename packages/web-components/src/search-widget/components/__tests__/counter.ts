import Counter from '../counter.svelte'
import { render, fireEvent } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText, getByTestId } = render(Counter, {
    value: 10,
  })

  const increment = getByText('+')
  const decrement = getByText('-')
  const counter = getByTestId('counter-value')

  await fireEvent.click(increment)
  await fireEvent.click(increment)
  await fireEvent.click(increment)
  await fireEvent.click(decrement)

  expect(counter.textContent).toBe('12')
})
