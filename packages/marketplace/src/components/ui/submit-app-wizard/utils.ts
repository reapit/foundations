import React from 'react'
import { useFormikContext } from 'formik'

export const handleUseEffectValidateOnMount = (validateForm: any) => () => {
  // field may not been touched, validate -> no error
  // will need error data to decide if "next" button should be disabled

  validateForm()
}

/* istanbul ignore next */
export const ValidateFormikOnMount = () => {
  // formik innerRef is really un-stable to use
  const { validateForm, values } = useFormikContext()
  console.log(values)

  React.useEffect(handleUseEffectValidateOnMount(validateForm), [])
  return null
}
