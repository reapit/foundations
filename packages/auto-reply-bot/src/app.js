module.export = (app) => app.on('issues.opened', async (event) => {
  const hasAccess = await event.octokit.orgs.checkMembershipForUser({
    org: 'reapit',
    username: event.payload.sender.login,
  })

  console.log('hasAccess', event.payload.sender.login, hasAccess)

  // if (hasAccess) {
  if (event.payload.sender.login !== 'bashleigh') {
    // avoid reapit employees
    return
  }

  return Promise.all([
    event.octokit.issues.createComment(event.issue({ body: 'Hello :wave:' })),
    event.octokit.issues.addLabels(event.issue({ labels: ['awaiting triage'] })),
  ])
})
