import { expect } from "chai";
import { ethers } from "hardhat";
import { GitcoinHook } from "../typechain-types";

describe("GitcoinHook", function () {
	let gitcoinHook: GitcoinHook;
	let owner: any;
	let signer1: any;
	let signer2: any;

	beforeEach(async function () {
		const GitcoinHook = await ethers.getContractFactory(
			"GitcoinHook"
		);
		gitcoinHook = await GitcoinHook.deploy();
		await gitcoinHook.deployed();

		[owner, signer1, signer2] = await ethers.getSigners();
		await gitcoinHook.connect(owner).addSigner(signer1.address);
	});

	describe("Signer management", function () {
		it("should add a signer", async function () {
			expect(await gitcoinHook.signers(signer1.address)).to.be
				.true;
		});

		it("should remove a signer", async function () {
			await gitcoinHook
				.connect(owner)
				.removeSigner(signer1.address);
			expect(await gitcoinHook.signers(signer1.address)).to.be
				.false;
		});
	});

	describe("Signature verification", function () {
		it("should verify a valid signature and return the key price", async function () {
			const message = ethers.utils.solidityKeccak256(
				["address"],
				[signer1.address]
			);
			const signature = await signer1.signMessage(
				ethers.utils.arrayify(message)
			);
			const price = await gitcoinHook.keyPurchasePrice(
				ethers.constants.AddressZero,
				signer1.address,
				ethers.constants.AddressZero,
				signature
			);
			expect(price).to.be.gt(0); // Assuming the key price is greater than 0
		});

		it("should not verify an invalid signature and revert", async function () {
			const message = ethers.utils.solidityKeccak256(
				["address"],
				[signer1.address]
			);
			const signature = await signer2.signMessage(
				ethers.utils.arrayify(message)
			);
			await expect(
				gitcoinHook.keyPurchasePrice(
					ethers.constants.AddressZero,
					signer1.address,
					ethers.constants.AddressZero,
					signature
				)
			).to.be.revertedWith("WRONG_SIGNATURE");
		});
	});
});
