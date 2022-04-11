/* istanbul ignore file */
/* Had to add because of skipped test, react hooks testing not yet supporting React 18 
https://github.com/testing-library/react-hooks-testing-library/issues/654 can remove when tests un-skipped
Looks like we will have to migrate to the main testing lib when this PR is merged
https://github.com/testing-library/react-testing-library/pull/991*/
import { useState, useEffect, useCallback, useRef, MutableRefObject, SetStateAction, Dispatch } from 'react'

export const handleSetRef =
  <StateType>(resolverRef: MutableRefObject<((state: StateType) => void) | undefined>, state: StateType) =>
  () => {
    if (resolverRef && resolverRef.current) {
      resolverRef.current(state)
      resolverRef.current = undefined
    }
  }

export const handleSetState =
  <StateType>(
    setState: Dispatch<SetStateAction<StateType>>,
    resolverRef: MutableRefObject<((state: StateType) => void) | undefined>,
  ) =>
  (state: StateType) => {
    setState(state)
    return new Promise<StateType>((resolve) => {
      resolverRef.current = resolve
    })
  }

export const useAsyncState = <StateType>(
  initialState: StateType,
): [StateType, (stateAction: StateType) => Promise<StateType>] => {
  const [state, setState] = useState<StateType>(initialState)
  const resolverRef = useRef<(state: StateType) => void>()

  useEffect(handleSetRef<StateType>(resolverRef, state), [resolverRef.current, state])

  const setStateHandler = useCallback<(stateAction: StateType) => Promise<StateType>>(
    handleSetState(setState, resolverRef),
    [setState],
  )

  return [state, setStateHandler]
}
