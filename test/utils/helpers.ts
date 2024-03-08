// helpers.ts
import { expectRevert } from "@openzeppelin/test-helpers";

export const reverts = async (
	call: Promise<any>,
	msg?: string
): Promise<void> => {
	if (msg) {
		await expectRevert(call, msg);
	} else {
		await expectRevert.unspecified(call);
	}
};
