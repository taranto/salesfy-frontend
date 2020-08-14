
import React, { useState, useCallback } from 'react';
import SimpleModal from 'web/stories/component/modal/Modal';
import { Translation } from 'app-core/utils/translate/Translation';
import { Typography } from '@material-ui/core';
import { OutlineDriveButton } from 'web/stories/component/button/Button';
import { GoogleDriveList } from 'web/stories/component/google-drive/GoogleDriveList';
import GoogleDriveService from 'app-core/services/GoogleDrive';
import { IS_DEVELOPMENT } from 'root/envVars';

export const GoogleDrive = ({ onSave }) => {
	const [joToken, setJoToken] = useState({})
	const [arJoFile, setArJoFile] = useState([]);

	// on Modal save confirm click
	const onClickSuccess = useCallback(() => {
		onSave(arJoFile, joToken);
	}, [arJoFile, joToken]);

	// on DriveItem selection change
	const onSelectionChange = (arJoRow) => {
		const arJoRowWithoutFoldersAndDecoys =
			arJoRow.filter((joRow) => {
				return joRow.tableData && !joRow.tableData.isFolder && !joRow.isDecoy
			})
		const arJoRowsUnique = arJoRowWithoutFoldersAndDecoys.filter((v, i, a) => a.indexOf(v) === i)
		setArJoFile(arJoRowsUnique)
	}

	return (
		<SimpleModal
			Button={(props) => <GoogleDriveButton {...props} setJoToken={setJoToken} />}
			Header={(props) => (
				<Typography variant="h5">
					<img src={require('assets/drive.png')} />
					{props.title}
				</Typography>
			)}
			title={Translation.driveIntegration}
			onClickSuccess={onClickSuccess}
			confirmButtonText={Translation.importFromGoogleDrive}
		>
			<GoogleDriveList joToken={joToken} onSelectionChange={onSelectionChange} />
		</SimpleModal>
	)
}

const GoogleDriveButton = (props) => {
	const onPress = () => {
		GoogleDriveService.signIn().then(response => {
			const tokens = IS_DEVELOPMENT ? response.Zi : response.uc
			if (tokens) {
				props.setJoToken({
					accessToken: tokens['access_token']
				});
			}
			props.setOpen(true);
		}).catch(e =>
			console.log("error sign in google drive: " + e)
		);
	}
	return (
		<OutlineDriveButton
			onClick={onPress}
			title={Translation.importFromGoogleDrive}
		/>

	)
}
