import React from 'react';
import { Grid, Avatar, Typography, Button, Tooltip } from '@material-ui/core';
import { DEFAULT_ENTER_DELAY } from 'root/envVars';
import { CtUserGroupAccess } from 'salesfy-shared';
import { CtUserGroupAccessFront } from 'app-core/utils/category/CtUserGroupAccessFront';
const AvatarProfile = '/assets/profile.png';

export const UserAvatar = ({ nmUser, piAvatar, emUser, open }) => (
	<Grid className="user-component menu" >
		<Avatar alt={nmUser} src={piAvatar ? piAvatar : AvatarProfile} className={`large-avatar menu-avatar`} />
		{nmUser && open && <Typography className={`text-color nm-avatar-menu`}>{nmUser}</Typography>}
		{emUser && open && <Typography className={`text-color em-avatar-menu ${open ? "open" : "closed"}`}>{emUser}</Typography>}
	</Grid>
)

export const UserNameField = ({ nmUser, piAvatar, emUser }) => (
	<Grid
		container={true}
		direction="row"
		justify="flex-start"
		alignItems="center"
		className="user-component list-group-avatar"
	>
		<Avatar alt={nmUser} src={piAvatar ? piAvatar : AvatarProfile} className={`small-avatar list-avatar`} />
		<div>
			{nmUser && <Typography className={`text-color nm-avatar small-text`}><b>{nmUser}</b></Typography>}
			{emUser && <Typography className={`text-color em-avatar small-text`}>{emUser}</Typography>}
		</div>
	</Grid>
)

export const ImageNameField = ({ nm, lkImage }) => (
	<Grid
		container={true}
		direction="row"
		justify="flex-start"
		alignItems="center"
		className="user-component"
	>
		<img alt={nm} src={lkImage} className={`small-avatar list-avatar`} />
		<div>
			{nm && <Typography className={`text-color nm-avatar small-text`}><b>{nm}</b></Typography>}
		</div>
	</Grid>
)

export const NewUserField = ({ children }) => (
	<Grid
		container={true}
		direction="row"
		justify="flex-end"
		alignItems="center"
		className="user-component"
	>
		{children}
	</Grid>
)

export const UserTypeField = ({ idUserGroup, idCtUserGroupAccess, disabled, onPress }) => {
	const dsTooltip = CtUserGroupAccessFront.dsTooltip(idCtUserGroupAccess)
	const nmCategory = CtUserGroupAccessFront.nmCategory(idCtUserGroupAccess)
	let dsClassNameSuffix = "reader"

	const admin = 'admin'
	const member = 'member'

	dsClassNameSuffix = idCtUserGroupAccess === CtUserGroupAccess.admin.key ? admin : dsClassNameSuffix
	dsClassNameSuffix = idCtUserGroupAccess === CtUserGroupAccess.member.key ? member : dsClassNameSuffix
	return (
		<Tooltip enterDelay={DEFAULT_ENTER_DELAY} title={dsTooltip}>
			<Grid
				container={true}
				direction="row"
				justify="flex-end"
				alignItems="center"
				className="user-component"
			>
				<Button
					disabled={disabled}
					className={`chip-type ${dsClassNameSuffix}`}
					onClick={() => onPress && onPress({ idUserGroup, idCtUserGroupAccess: CtUserGroupAccessFront.next(idCtUserGroupAccess)})}
				>
					{nmCategory}
				</Button>
			</Grid>
		</Tooltip>
	)
}

export const UserComboSuggestion = ({ nmUser, piAvatar, emUser }) => (
	<Grid
		container={true}
		direction="row"
		justify="flex-start"
		alignItems="center"
		className=""
	>
		<Avatar alt={nmUser} src={piAvatar ? piAvatar : AvatarProfile} className={`small-avatar list-avatar`} />
		<div>
			{nmUser && <Typography className={`text-color nm-avatar small-text`}><b>{nmUser}</b></Typography>}
			{emUser && <Typography className={`text-color em-avatar small-text`}>{emUser}</Typography>}
		</div>
	</Grid>
)
