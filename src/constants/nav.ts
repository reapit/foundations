import Routes from './routes'

const NavMenu = {
  DEVELOPER: [
    {
      text: 'Browser',
      to: Routes.DEVELOPER
    },
    {
      text: 'Submit app',
      to: Routes.SUBMIT_APP
    }
  ],
  CLIENT: [
    {
      text: 'Browser',
      to: Routes.CLIENT
    },
    {
      text: 'My apps',
      to: Routes.MY_APPS
    }
  ]
}

export default NavMenu
