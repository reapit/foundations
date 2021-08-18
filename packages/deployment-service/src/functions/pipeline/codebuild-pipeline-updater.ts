import { Context, Callback, SNSEvent, SNSHandler } from 'aws-lambda'
// import { findPipelineRunnerByCodeBuildId } from 'src/services'

export const codebuildPipelineUpdater: SNSHandler = async (
  event: SNSEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      // const pipelineRunner = await findPipelineRunnerByCodeBuildId(record.)
      console.log('record', record.Sns)
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
