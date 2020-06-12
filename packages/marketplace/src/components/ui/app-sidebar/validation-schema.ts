import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  search: Yup.string().max(256, 'Input is too long'),
  searchBy: Yup.string().required(),
})
