const s3 = require('aws-sdk/clients/s3')
const { execSync } = require('child_process')

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

const ignorePatterns = [/^config.json/, /^index.html/, /sw.js/, /assets\/.+/]

const client = new s3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

const getTwoPreviousCommitsHash = () => {
  const stdOutExecSync = execSync('git rev-list --reverse --branches=mater HEAD | tail -2')
  const parsedStdOutExecSync = stdOutExecSync
    .toString()
    .trim()
    .split('\n')

  return parsedStdOutExecSync
}

const filterS3ObjectKeysNotBelongToHashesOrIgnoreFiles = (s3Objects, hashes) =>
  s3Objects
    .filter(s3Object => {
      const fileName = s3Object.Key
      const parsedFileName = fileName.split('.')

      const hash = parsedFileName[1]

      return !ignorePatterns.some(ignorePattern => ignorePattern.test(fileName)) && !hashes.includes(hash)
    })
    .map(s3Objects => ({
      Key: s3Objects.Key,
    }))

const purgeUnusedAssetsFromS3Bucket = async bucket => {
  console.log(`Bucket: ${bucket}: Checking for slate assets (assets not belong to 2 previous recent commits)`)

  const s3Objects = (await client.listObjects({ Bucket: bucket }).promise()).Contents

  const twoPreviousCommitsHash = getTwoPreviousCommitsHash()

  const s3ObjectKeysNotBelongToTwoPreviousCommitsHash = filterS3ObjectKeysNotBelongToHashesOrIgnoreFiles(
    s3Objects,
    twoPreviousCommitsHash,
  )

  if (s3ObjectKeysNotBelongToTwoPreviousCommitsHash.length > 0) {
    console.log(
      `Bucket: ${bucket}: Two previous commit hashes are: ${twoPreviousCommitsHash.join(', ')}
Assets of 2 previous recent commits in the master branch have been detected, and will be deleted shortly`,
    )

    console.log(
      `Bucket ${bucket}: Proceed to delete files: `,
      s3ObjectKeysNotBelongToTwoPreviousCommitsHash.map(
        s3ObjectKeyNotBelongToTwoPreviousCommitsHash => s3ObjectKeyNotBelongToTwoPreviousCommitsHash.Key,
      ),
    )

    await client
      .deleteObjects({
        Bucket: bucket,
        Delete: {
          Objects: s3ObjectKeysNotBelongToTwoPreviousCommitsHash,
        },
      })
      .promise()

    console.log(`Bucket: ${bucket}: Delete unused assets successfully`)
    return
  }

  console.log(`Bucket: ${bucket}: No slate assets detected`)
  return
}

const main = async () => {
  const [, , ...args] = process.argv
  console.log(args[0], args[1])

  if (args.length >= 1 && args[0] && args[1]) {
    try {
      const bucketDev = args[0]
      const bucketProd = args[1]

      await Promise.all([purgeUnusedAssetsFromS3Bucket(bucketDev), purgeUnusedAssetsFromS3Bucket(bucketProd)])
    } catch (err) {
      console.log(`Bucket ${args}`, err)
    }
  } else {
    console.error('Two arguments need to be suppled <<development bucket>> and <<production bucket>>')
    process.exit(1)
  }
}

main()
