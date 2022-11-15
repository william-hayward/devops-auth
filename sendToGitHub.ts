/**
 * This is a utility program that commits, and pushes to github, a version of the project
 * with the node modules installed. This was necessary as the university's network seems to throttle
 * npm install; however, downloading a GitBranch is fast.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { exec } from "child_process";

/**
 * Executes a shell command and return it as a Promise.
 */
function execShellCommand(cmd: string) {
	return new Promise((resolve) => {
		exec(cmd, (error: unknown, stdout: unknown, stderr: unknown) => {
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
		await execShellCommand("git commit -m \"bot commit\"");
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		await execShellCommand(`git checkout -b ${nodeModulesBranch}`);
		console.log("uploading to github");
		await execShellCommand(`git push origin ${nodeModulesBranch} --force`);
		await execShellCommand(`git checkout ${currentBranch}`);
		await execShellCommand(`git push origin ${currentBranch} --force`);
		console.log("upload to github complete");
		await execShellCommand("git branch -D " + nodeModulesBranch);
	} catch (e) {
		console.error("failed to push branch to GitHub:" + JSON.stringify(e));
	}
}

main();
