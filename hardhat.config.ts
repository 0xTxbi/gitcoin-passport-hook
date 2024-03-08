import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@unlock-protocol/hardhat-plugin";
import * as dotenv from "dotenv";

dotenv.config();

let accounts: string[] = [];
if (process.env.PRIVATE_KEY) {
	accounts.push(process.env.PRIVATE_KEY);
} else {
	throw new Error(
		"ensure to set the PRIVATE_KEY environment variable to your private key."
	);
}

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.9",
	},
	networks: {
		sepolia: {
			url: process.env.NETWORK_URL || "",
			accounts,
		},
	},
	etherscan: {
		apiKey: {
			sepolia: process.env.ETHERSCAN_KEY || "",
		},
	},
};

export default config;
