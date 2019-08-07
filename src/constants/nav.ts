import Routes from './routes'

const NavMenu = {
  DEVELOPER: [
    {
      text: 'Manage Apps',
      to: Routes.DEVELOPER_MY_APPS
    },
    // TODO - reinstate when we have requirements
    // {
    //   text: 'Manage Keys',
    //   to: Routes.DEVELOPER
    // },
    {
      text: 'API Documentation',
      to: Routes.DEVELOPER_API_DOCS
    },
    {
      text: 'Submit App',
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
  ],
  ADMIN: [
    {
      text: 'App Revisions',
      to: Routes.ADMIN
    },
    {
      text: 'Approvals',
      to: Routes.ADMIN_APPROVALS
    }
  ]
}

export default NavMenu
