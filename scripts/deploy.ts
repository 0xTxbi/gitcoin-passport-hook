import { ethers } from "hardhat";

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contract with the account:", deployer.address);
	console.log(
		"Account balance:",
		(await ethers.provider.getBalance(deployer.address)).toString()
	);

	// obtain the contract factory for the GitcoinHook contract
	const GitcoinHook = await ethers.getContractFactory("GitcoinHook");

	// deploy the contract
	const gitcoinHook = await GitcoinHook.deploy();

	// wait for the contract to be deployed
	await gitcoinHook.deployed();

	// log the address where the contract was deployed
	console.log("GitcoinHook deployed to:", gitcoinHook.address);
}

// exit script gracefully
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
