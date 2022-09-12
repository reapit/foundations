const newIssueAddedConditions = [
  {
    labels: ['bug', 'needs-triage'],
    comment:
      'Thank you for taking the time to report a bug. We prioritise bugs depending on the severity and implications, so please ensure that you have provided as much information as possible. If you haven’t already, it really helps us to investigate the bug you have reported if you provide ‘Steps to Replicate’ and any associated screenshots. \r\n' +
      'Please ensure any personal information from the production database is obscured when submitting screenshots.\r\n' +
      'This issue will be reviewed in our weekly refinement sessions and assigned to a specific project board. We may also update the ticket to request additional information, if required. \r\n' +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
  {
    labels: ['external-request', 'needs-triage'],
    comment:
      'Thank you for raising a feature request. Feature requests will be prioritised in accordance with our roadmap, customer and developer priorities. \r\n' +
      'This request will be reviewed in our weekly refinement sessions and assigned to a specific project board or column, depending on the nature of the request and the development work required. \r\n' +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
  // {
  //   labels: ['question', 'needs-triage'],
  //   comment: " \r\n" +
  //   "T \r\n" +
  //   "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  // },
]

const labelAddedConditions = [
  {
    labels: ['backend'],
    comment:
      'This issue has recently been assigned to our ‘Backend’ project board for review. All issues are reviewed in a weekly refinement session and where applicable, a comment and associated label will be added. If required, we will add a technical specification to the ticket. Please take the time to review the information. \r\n' +
      "When we're ready to schedule the issue, it will be assigned to the relevant board where you can continue to track its progress to completion. \r\n" +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
  {
    labels: ['front-end'],
    comment:
      'This issue has recently been assigned to our ‘Front-end’ project board for review. All issues are reviewed in a weekly refinement session and where applicable, a comment and associated label will be added. If required, we will add a technical specification to the ticket. Please take the time to review the information. \r\n' +
      "When we're ready to schedule the issue, it will be moved to the relevant column where you can continue to track its progress to completion. \r\n" +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
  {
    labels: ['too-big'],
    comment:
      'This issue has been reviewed and is too big to be handled in a single issue and requires the need to be broken down by our development team. We will add the associated/dependent issues to this ticket when available. \r\n' +
      'The individual tickets will then be review in our weekly refinement sessions. \r\n' +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
  {
    labels: ['agency-cloud'],
    comment:
      'As this issue relates to AgencyCloud, we are unable to process this through the Platform in accordance with our Developer Processes. \r\n' +
      'Issues relating to AgencyCloud should not be submitted via the Foundations GitHub repo but should be raised via the Reapit Service Desk by a Reapit Customer. \r\n' +
      'Please ask a Reapit Customer to raise this issue via the Reapit Service Desk. \r\n' +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
  {
    labels: ['product-decision'],
    comment:
      'The nature of this request requires product direction and therefore we have moved this issue into our ‘Not Ready’ column whilst we obtain the information/direction required. \r\n' +
      'This issue will be updated when a product decision has been made. \r\n' +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
  {
    labels: ['investigate'],
    comment:
      'We need to research or gather more information relating to this request. We have moved this issue into our ‘Not Ready’ column whilst we obtain the information required. \r\n' +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
  {
    labels: ['response-needed'],
    comment:
      'We have recently requested additional information relating to the issue you have raised. Please can you take the time to review this ticket and where applicable, provide the information requested. \r\n' +
      'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  },
]

const movedColumnResponses = {
  ['near term']:
    "This issue has been updated and moved to our ‘Near Term’ column (typically completed within 0 - 4 months). We have assessed the effort required and outlined a technical specification - please take the time to review this detail. When we're ready to schedule the issue, it will be assigned to the relevant board where you can continue to track its progress to completion. \r\n" +
    'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  ['mid term']:
    "This issue has been updated and moved to our ‘Mid Term’ column (typically completed within 5 - 8 months). We will assess the effort required and may outline a technical specification. When we're ready to schedule the issue, it will be moved to the ‘Near Term’ column. \r\n" +
    'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
  ['long term']:
    'Whilst the nature of this request has been accepted, we are unable to commit to a specified sprint and therefore have assigned this issue to the ‘Long Term’ column (typically completed 9+ months). We will regularly review any issues and where development capacity is available, or work is aligned with our Roadmap, the issue will be updated. \r\n' +
    'For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
}

const ownerships = ['OWNER', 'MEMBER', 'CONTRIBUTOR']

export default (app) => {
  app.on('issues.opened', async (event) => {
    if (ownerships.includes(event.payload.issue.author_association)) {
      console.log('association', event.payload.issue.author_association)
      return
    }

    const issueLabels = event.payload.issue.labels.map((label) => label.name)

    for (const [, condition] of newIssueAddedConditions.entries()) {
      console.log(
        'condition',
        condition.labels,
        condition.labels.every((label) => issueLabels.includes(label.toLowerCase())),
      )
      if (condition.labels.every((label) => issueLabels.includes(label))) {
        await Promise.all([event.octokit.issues.createComment(event.issue({ body: condition.comment }))])

        break
      }
    }
  })

  app.on('issues.labeled', async (event) => {
    if (ownerships.includes(event.payload.issue.author_association)) {
      console.log('association', event.payload.issue.author_association)
      return
    }

    for (const [, condition] of labelAddedConditions.entries()) {
      if (condition.labels.every((label) => label === event.payload.label.name.toLowerCase())) {
        await Promise.all([event.octokit.issues.createComment(event.issue({ body: condition.comment }))])

        break
      }
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

    const [toColumn] = await Promise.all([
      event.octokit.projects.getColumn({ column_id: event.payload.project_card.column_id }),
    ])

    const repoInfo = {
      repo: event.payload.repository.name,
      // TODO potential conflict here where owner is org on reapit/foundations
      owner: event.payload.repository.owner.login,
    }

    if (!Object.keys(movedColumnResponses).includes(toColumn.data.name.toLowerCase())) {
      return
    }

    const issue = await event.octokit.issues.get({ issue_number: Number.parseInt(issueNumber), ...repoInfo })

    if (!issue.data) {
      console.log('issue not found')
      return
    }

    if (ownerships.includes(issue.data.author_association)) {
      console.log('association', event.payload.issue.author_association)
      return
    }

    console.log(
      'test',
      toColumn.data.name.toLowerCase,
      Object.keys(movedColumnResponses),
      movedColumnResponses[toColumn.data.name.toLowerCase],
    )

    return event.octokit.issues.createComment({
      issue_number: issue.data.number,
      ...repoInfo,
      body: movedColumnResponses[toColumn.data.name.toLowerCase()],
    })
  })

  app.on('issue_comment.created', async (event) => {
    if (ownerships.includes(event.payload.issue.author_association)) {
      console.log('association', event.payload.issue.author_association)
      return
    }

    if (event.payload.issue.state === 'closed') {
      return Promise.all([
        event.octokit.issues.createComment(
          event.issue({
            body:
              'It looks like you have commented on a closed issue. If your comment relates to a bug or feature request, please open a new issue, and include this issue number/url for reference. \r\n' +
              'For more information on our processes,  [please click here](https://foundations-documentation.reapit.cloud/dev-requests)',
          }),
        ),
      ])
    }
  })
}
