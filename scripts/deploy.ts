import { ethers } from "hardhat";

async function main() {
	const [signer] = await ethers.getSigners();
	console.log(`Deploying GitcoinHook from ${signer.address}`);

	const GitcoinHook = await ethers.getContractFactory("GitcoinHook");
	const gitcoinHook = await GitcoinHook.deploy();

	await gitcoinHook.waitForDeployment();

	 const gitcoinHookAddress = await gitcoinHook.getAddress();
    console.log(`Deployed to ${gitcoinHookAddress}`);

}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
