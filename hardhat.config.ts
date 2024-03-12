import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@unlock-protocol/hardhat-plugin";
import * as dotenv from "dotenv";
import networks from "@unlock-protocol/networks";

dotenv.config();

let accounts: string[] = [];
if (process.env.PRIVATE_KEY) {
	accounts.push(process.env.PRIVATE_KEY);
} else {
	throw new Error(
		"Ensure to set the PRIVATE_KEY environment variable to your private key."
	);
}

const unlockNetworks = Object.keys(networks).reduce((acc, networkId) => {
	const network = networks[networkId];
	return {
		...acc,
		[network.chain]: {
			accounts,
			url: network.provider,
		},
	};
}, {});

const config: HardhatUserConfig = {
	solidity: "0.8.9",
	networks: unlockNetworks,
	etherscan: {
		apiKey: {
			sepolia: process.env.ETHERSCAN_KEY || "",
		},
	},
};

export default config;
