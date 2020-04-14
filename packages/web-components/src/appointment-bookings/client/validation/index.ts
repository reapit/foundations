import { writable } from 'svelte/store'
import { buildValidator } from './validate'

export function createFieldValidator(...validators: any[]) {
  const { subscribe, set } = writable({ dirty: false, valid: false, message: null })
  const validator = buildValidator(validators)

  function action(node: any, binding: any) {
    function validate(value: any, dirty: boolean) {
      const result = validator(value, dirty)
      set(result)
    }

    validate(binding, false)

    return {
      update(value: any) {
        validate(value, true)
      },
    }
  }

  return [{ subscribe }, action]
}
