import routes from '@/constants/routes'

export default {
  url: routes.REGISTER,
  selectors: {
    textBoxFullName: 'input#name',
    textBoxCompanyName: 'input#companyName',
    textBoxEmail: 'input#email',
    textBoxTel: 'input#telephone',
  },
}
