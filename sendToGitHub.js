/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This is a utility program that commits, and pushes to github, a version of the project
 * with the node modules installed. This was necessary as the university's network seems to throttle
 * npm install; however, downloading a GitBranch is fast.
 */

const {exec} = require("child_process");

/**
 * Executes a shell command and return it as a Promise.
 */
function execShellCommand(cmd) {
  return new Promise((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

/**
 * Creates a <branch>_with_node_modules branch and sends this branch to GitHub
 */

async function main() {
  const branch = await execShellCommand("git rev-parse --abbrev-ref HEAD");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const currentBranch = branch.replace("\n", "");
  const nodeModulesBranch = `${currentBranch}_with_node_modules`;
  try {
    await execShellCommand("git add -A");
    await execShellCommand('git commit -m "bot commit"');

    console.log("sending node_modules branch to github");
    await execShellCommand(`git checkout -b ${nodeModulesBranch}`);
    await execShellCommand("git add -f node_modules");
    await execShellCommand('git commit -m "bot commit"');
    await execShellCommand(`git push origin ${nodeModulesBranch} --force`);
    console.log("node modules sent to github");

    console.log("uploading original branch to github");
    await execShellCommand(`git checkout ${currentBranch}`);
    await execShellCommand(`git push origin ${currentBranch} --force`);
    console.log("upload to github complete");
  } catch (e) {
    console.error("failed to push branch to GitHub:" + JSON.stringify(e));
  }
}

main();
