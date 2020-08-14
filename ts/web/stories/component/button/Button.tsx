import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { AddCircleOutline, Check, Close, DeleteOutline, Edit, Bookmark, PersonAdd } from '@material-ui/icons';
import { I18n } from 'salesfy-shared';
import { KeyEnum } from 'salesfy-shared';
import { Button } from '@material-ui/core';
import { Translation } from 'app-core/utils/translate/Translation';

export const VoidButton = () => (
	<IconButton disabled={true} className={"void-button"}/>
)

export const NewButton = ({ onClick, className = "", placeholder = Translation.newGroup }) => (
	<Tooltip title={placeholder}>
		<Button variant="outlined" size="small" onClick={onClick} className={`new-button ${className}`}>
			<AddCircleOutline fontSize="small" />{placeholder}
		</Button>
	</Tooltip>
)

export const NewUserButton =  ({ onClick, className = "", placeholder = I18n.t(KeyEnum.addOrInviteUser) }) => (
	<Tooltip title={placeholder}>
		<IconButton onClick={onClick || null} className={className}>
			<PersonAdd fontSize="small" />
		</IconButton>
	</Tooltip>
)

export const AddButton = ({ onClick, className = "", placeholder = I18n.t(KeyEnum.add) }) => (
	<Tooltip title={placeholder}>
		<IconButton onClick={onClick} className={className}>
			<AddCircleOutline fontSize="small" />
		</IconButton>
	</Tooltip>
)

export const FavoriteButton = ({ onClick, className = "", placeholder = Translation.toFavorite, checked }) => {
	return (<Tooltip title={placeholder}>
		<IconButton onClick={onClick} className={className}>
			<Bookmark fontSize="small" color={checked ? "primary" : "inherit"}/>
		</IconButton>
	</Tooltip>)
}


export const SaveButton = ({ onClick, className = "", placeholder = I18n.t(KeyEnum.save) }) => (
	<Tooltip title={placeholder}>
		<IconButton onClick={onClick} className={className}>
			<Check fontSize="small" />
		</IconButton>
	</Tooltip>
)

export const SaveCompleteButton = ({ onClick, className = "", placeholder = I18n.t(KeyEnum.save) }) => (
	<Tooltip title={placeholder}>
		<Button variant="outlined" size="small" onClick={onClick} className={`success-button ${className}`}>
			<Check fontSize="small" />
			{placeholder}
		</Button>
	</Tooltip>
)

export const CancelCompleteButton = ({ onClick, className = "", placeholder = I18n.t(KeyEnum.save) }) => (
	<Tooltip title={placeholder}>
		<Button variant="text" size="small" onClick={onClick} className={`error-button ${className}`}>
			<Close fontSize="small" />
			{placeholder}
		</Button>
	</Tooltip>
)

export const CancelButton = ({ onClick, className = "", placeholder = I18n.t(KeyEnum.cancel) }) => (
	<Tooltip title={placeholder}>
		<IconButton onClick={onClick} className={className}>
			<Close fontSize="small" />
		</IconButton>
	</Tooltip>
)

export const CloseButton = ({ onClick, className = "", placeholder = Translation.close }) => (
	<Tooltip title={placeholder}>
		<IconButton onClick={onClick} className={className}>
			<Close fontSize="small" />
		</IconButton>
	</Tooltip>
)

export const DeleteButton = ({ onClick, className = "", placeholder = I18n.t(KeyEnum.delete) }) => (
	<Tooltip title={placeholder}>
		<IconButton onClick={onClick} className={className}>
			<DeleteOutline fontSize="small" />
		</IconButton>
	</Tooltip>
)

export const EditButton = ({ onClick, className = "", placeholder = Translation.edit }) => { return (
	<Tooltip title={placeholder}>
		<IconButton onClick={onClick} className={className}>
			<Edit fontSize="small" />
		</IconButton>
	</Tooltip>
)}


export const OutlineButton = ({ onClick, className = "", placeholder = "" }) => (
	<Tooltip title={placeholder}>
		<Button variant="outlined" size="small" onClick={onClick} className={`new-button ${className}`}>
			<AddCircleOutline fontSize="small" />
			{placeholder}
		</Button>
	</Tooltip>
)

export const LinkButton = (props) => {
	const { onClick, className = "", title = "" } = props;
	return (
		<Button {...props} variant="text" size="small" onClick={onClick} className={`${className}`}>
			{title}
		</Button>
	)
}

export const OutlineDriveButton = (props) => {
	const { onClick, className = "", title } = props;
	return (
		<Button variant="outlined" size="small" color="secondary" onClick={onClick} className={`drive-button ${className}`}>
			<img src={require('assets/drive.png')} />
			{title}
		</Button>
	)
}

export const PrepareButton = ({ onClick, className = "", placeholder = "" }) => (
	<Button variant="outlined" size="small" onClick={onClick} className={`new-button ${className}`}>
		{placeholder}
	</Button>
)
