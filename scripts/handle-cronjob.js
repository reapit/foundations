const { execSync } = require("child_process");

const bumpVersion = require('./bump-version')
const releaseMaster = require('./release-master')
const gitStatus = execSync('git status -s').toString()

const {
  npm_package_version,
  GITHUB_TOKEN,
  GITHUB_ACTOR,
  GITHUB_REPOSITORY
} = process.env;  

console.log(`Cronjob executed at ${new Date().toDateString()} - ${new Date().toTimeString()}`)

if (!gitStatus) {
  console.log('No changes')
  return
}

const remoteRepo = `https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git`;
execSync(`git remote add authOrigin ${remoteRepo}`);
execSync(`git config --global user.email "GithubActions@email.com"`);
execSync(`git config --global user.name "Github Actions"`);

bumpVersion()
releaseMaster()