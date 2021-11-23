const templateReply =
  'Thank you for raising a Feature Request. At our next refinement session, the team will discuss the issue and should we agree that development is warranted, we will commit to the work. However, if we need to gather more information or investigate, the relevant label will be added and if applicable, we will add a comment.  \r\nFor more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)'

const labelReply =
  "We have added the label of 'question' as the nature of your request requires product direction.  \r\nFor information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)"

// The 'from column' the condition is to match
const nearTermFromColumn = 'second'
// the 'to column' the condition is to match
const nearTermToColumn = 'third'
const nearTerm =
  "This ticket has been moved to our near-term column as have we identified this as a short term goal, we'll assess the effort required and outline a technical specification - please take the time to review this detail. The issue will be prioritised against the needs of other customers and developers. When we're ready to schedule the issue, it will be assigned to a dated GitHub project board for that particular sprint where you can continue to track its progress to completion."

export default (app) => {
  app.on('issues.opened', async (event) => {
    if (['OWNER', 'MEMBER'].includes(event.payload.issue.author_association)) {
      return
    }

    const featureRequestLabels = ['external-feature', 'needs-triage']
    const bugLabels = ['bug', 'needs-triage']

    const isFeatureRequestTemplate = featureRequestLabels.every((label) => event.payload.issue.labels.includes(label))
    const isBugTemplate = bugLabels.every((label) => event.payload.issue.labels.includes(label))

    if (!isFeatureRequestTemplate || !isBugTemplate) {
      console.log('is not feature request or bug template')
      return
    }

    if (isFeatureRequestTemplate) {
      return Promise.all([
        event.octokit.issues.createComment(event.issue({ body: `Hello :wave:
        ${templateReply}
        ` })),
        event.octokit.issues.addLabels(event.issue({ labels: ['awaiting triage'] })),
      ])
    }

    if (isBugTemplate) {
      return Promise.all([
        event.octokit.issues.createComment(event.issue({ body: `Hello :wave:
        ${templateReply}
        ` })),
        event.octokit.issues.addLabels(event.issue({ labels: ['awaiting triage'] })),
      ])
    }
  })

  app.on('issues.labeled', (event) => {
    // TODO requires 'member of org' condition?
    if (event.payload.label.name === 'question') {
      return Promise.all([event.octokit.issues.createComment(event.issue({ body: labelReply }))])
    }
  })

  app.on('project_card.moved', async (event) => {
    const issueNumber = event.payload.project_card.content_url
      ? event.payload.project_card.content_url.split('/').pop()
      : undefined
    if (!issueNumber) {
      return
    }

    if (!issueNumber || !event.payload.changes.column_id.from) {
      return
    }

    const [toColumn, fromColumn] = await Promise.all([
      event.octokit.projects.getColumn({ column_id: event.payload.project_card.column_id }),
      event.octokit.projects.getColumn({ column_id: event.payload.changes.column_id.from }),
    ])

    const repoInfo = {
      repo: event.payload.repository.name,
      // TODO potential conflict here where owner is org on reapit/foundations
      owner: event.payload.repository.owner.login,
    }

    if (fromColumn.data.name === nearTermFromColumn && toColumn.data.name === nearTermToColumn) {
      const issue = await event.octokit.issues.get({ issue_number: Number.parseInt(issueNumber), ...repoInfo })

      if (['OWNER', 'MEMBER'].includes(issue.data.author_association)) {
        return
      }

      if (!issue.data) {
        console.log('issue not found')
        return
      }

      return event.octokit.issues.createComment({
        issue_number: issue.data.number,
        ...repoInfo,
        body: nearTerm,
      })
    }
  })
}
