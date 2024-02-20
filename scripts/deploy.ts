import { ethers } from "hardhat";

async function main() {
	const [signer] = await ethers.getSigners();
	console.log(`Deploying GitcoinHook from ${signer.address}`);

	const GitcoinHook = await ethers.getContractFactory("GitcoinHook");
	const gitcoinHook = await GitcoinHook.deploy();

	await gitcoinHook.deployed();

	console.log(`Deployed to ${gitcoinHook.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
