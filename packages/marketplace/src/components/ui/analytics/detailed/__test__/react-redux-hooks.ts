// we do it in such way to be able to mock it in test
import { useSelector as originalUseSelector, useDispatch as originalUseDispatch } from 'react-redux'

export const useSelector = state => originalUseSelector(state)
export const useDispatch = () => originalUseDispatch()
