import { CtUserGroupAccess as CtUserGroupAccessShared } from "salesfy-shared";
import { Translation } from "app-core/utils/translate/Translation";

export class CtUserGroupAccessFront extends CtUserGroupAccessShared {

	public static dsTooltip(key: number): string {
		let dsTooltip = ""
		switch (key) {
			case CtUserGroupAccessShared.admin.key: dsTooltip = Translation.groupAdminTooltip; break;
			case CtUserGroupAccessShared.member.key: dsTooltip = Translation.groupMemberTooltip; break;
			case CtUserGroupAccessShared.reader.key: dsTooltip = Translation.groupReaderTooltip; break;
			default: dsTooltip = ""; break;
		}
		return dsTooltip
	}

	public static nmCategory(key: number): string {
		let dsTooltip = ""
		switch (key) {
			case CtUserGroupAccessShared.admin.key: dsTooltip = Translation.nmGroupAdmin; break;
			case CtUserGroupAccessShared.member.key: dsTooltip = Translation.nmGroupMember; break;
			case CtUserGroupAccessShared.reader.key: dsTooltip = Translation.nmGroupReader; break;
			default: dsTooltip = ""; break;
		}
		return dsTooltip
	}

	public static next(key: number, isUpgrading = true): number {
		const ctCurrent = CtUserGroupAccessShared.get(key)
		const nrNextKey = isUpgrading ? key + 1 : key - 1
		const ctNext = CtUserGroupAccessShared.get(nrNextKey)
		if (ctCurrent !== ctNext) {
			return ctNext.key
		}
		const ctBase = CtUserGroupAccessShared.get(CtUserGroupAccessShared.admin.key)
		return ctBase.key
	}
}
