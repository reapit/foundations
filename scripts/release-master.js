const Octokit = require("@octokit/rest");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { GITHUB_TOKEN } = process.env;

module.exports = async () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../package.json")).toString()
  );

  let tagName = "v" + packageJson.version;

  const octokit = new Octokit({
    auth: GITHUB_TOKEN
  });

  try {
    await octokit.git.createRef({
      owner: "reapit",
      repo: "foundations-ts-definitions",
      ref: "refs/tags/" + tagName,
      sha: process.env.GITHUB_SHA
    });

    // create new release based on tag
    await octokit.repos.createRelease({
      owner: "reapit",
      repo: "foundations-ts-definitions",
      tag_name: tagName
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
