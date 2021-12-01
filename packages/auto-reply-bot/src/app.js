// The 'from column' the condition is to match
const nearTermFromColumn = 'second'
// the 'to column' the condition is to match
const nearTermToColumn = 'third'
const nearTerm =
  "This ticket has been moved to our near-term column as have we identified this as a short term goal, we'll assess the effort required and outline a technical specification - please take the time to review this detail. The issue will be prioritised against the needs of other customers and developers. When we're ready to schedule the issue, it will be assigned to a dated GitHub project board for that particular sprint where you can continue to track its progress to completion."

const newIssueAddedConditions = [
  {
    labels: ['bug', 'needs triage'],
    comment: "Thank you for taking the time to report a bug. We prioritise bugs depending on the severity and implications, so please ensure that you have provided as much information as possible. If you haven’t already, it really helps us to investigate the bug you have reported if you provide ‘Steps to Replicate’ and any associated screenshots. \r\n" +
    "This issue will be reviewed in our weekly refinement sessions and assigned to a specific project board. We may also update the ticket to request additional information, if required. \r\n" +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
  {
    labels: ['external feature', 'needs triage'],
    comment: "Thank you for raising a feature request. Feature requests will be prioritised in accordance with the upcoming milestone target dates, customer and developer priorities. \r\n" +
    "This request will be reviewed in our weekly refinement sessions and assigned to a specific project board or column, depending on the nature of the request and the development work required. \r\n" +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
]

const labelAddedConditions = [
  {
    labels: ['backend'],
    comment: "Your issue has recently been assigned to our ‘Backend’ project board for review. All issues are reviewed in a weekly refinement session and where applicable, a comment and associated label will be added. If required, we will add a technical specification to the ticket. Please take the time to review the information. \r\n" +
    "When we're ready to schedule the issue, it will be assigned to the relevant board where you can continue to track its progress to completion. \r\n" +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
  {
    labels: ['front-end'],
    comment: "Your issue has recently been assigned to our ‘Front-end’ project board for review. All issues are reviewed in a weekly refinement session and where applicable, a comment and associated label will be added. If required, we will add a technical specification to the ticket. Please take the time to review the information. \r\n" +
    "When we're ready to schedule the issue, it will be moved to the relevant column where you can continue to track its progress to completion. \r\n" +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
  {
    labels: ['too-big'],
    comment: "This issue has been reviewed and is too large to be handled in a single issue and requires need to be broken down by our development team. We will add the associated/dependent issues to this ticket when available. \r\n" +
    "The induvial tickets will then review in our weekly refinement sessions.  " +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
  {
    labels: ['agency-cloud'],
    comment: "As this issue relates to AgencyCloud, we are unable to process this through the Platform in accordance with our Developer Processes. \r\n" +
    "Issues relating to AgencyCloud should not be submitted via the Foundations GitHub repo but should be requested via the Reapit Service Desk by a Reapit Customer. \r\n" +
    "Please ask a Reapit Customer to raise this issue via the Reapit Service Desk.  " +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
  {
    labels: ['product-decision'],
    comment: "The nature of your request requires product direction and therefore we have moved this issue into our ‘Not Ready’ column whilst we obtain the information/direction required. \r\n" +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
  {
    labels: ['product-decision'],
    comment: "We need to research or gather more information relating to your request. We have moved this issue into our ‘Not Ready’ column whilst we obtain the information required. \r\n" +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
  {
    labels: ['response-needed'],
    comment: "We have recently requested additional information relating to the issue you have raised. Please can you take the time to review this ticket and where applicable, provide the information requested. \r\n" +
    "For more information on our processes, [please click here](https://foundations-documentation.reapit.cloud/dev-requests)",
  },
]

export default (app) => {
  app.on('issues.opened', async (event) => {
    if (['OWNER', 'MEMBER'].includes(event.payload.issue.author_association)) {
      return
    }

    const issueLabels = event.payload.issue.labels.map(label => label.name)

    for (const [, condition] of newIssueAddedConditions.entries()) {
      console.log('condition', condition.labels, condition.labels.every(label => issueLabels.includes(label)))
      if (condition.labels.every(label => issueLabels.includes(label))) {
        await Promise.all([
          event.octokit.issues.createComment(event.issue({ body: condition.comment })),
          // event.octokit.issues.addLabels(event.issue({ labels: ['awaiting triage'] })),
        ])

        break
      }
    }
  })

  app.on('issues.labeled', async (event) => {
    // TODO requires 'member of org' condition?
    if (['OWNER', 'MEMBER'].includes(event.payload.issue.author_association)) {
      return
    }

    const issueLabels = event.payload.issue.labels.map(label => label.name)

    for (const [, condition] of labelAddedConditions.entries()) {
      if (condition.labels.every(label => issueLabels.includes(label))) {
        await Promise.all([
          event.octokit.issues.createComment(event.issue({ body: label.comment })),
          // event.octokit.issues.addLabels(event.issue({ labels: ['awaiting triage'] })),
        ])

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
