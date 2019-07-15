import Routes from './routes'

const NavMenu = {
  DEVELOPER: [
    {
      text: 'Manage Apps',
      to: Routes.DEVELOPER_MY_APPS
    },
    {
      text: 'Manage Keys',
      to: Routes.DEVELOPER
    },
    {
      text: 'Submit app',
      to: Routes.SUBMIT_APP
    }
  ],
  CLIENT: [
    {
      text: 'Browse Apps',
      to: Routes.CLIENT
    },
    {
      text: 'Installed Apps',
      to: Routes.MY_APPS
    }
  ]
}

export default NavMenu
