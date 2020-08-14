
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { I18n } from 'salesfy-shared';
import GoogleDrive from '../../../../core/services/GoogleDrive';
import { FileField } from 'web/stories/component/google-drive/GoogleDriveItem';
import { Translation } from 'app-core/utils/translate/Translation';

const initialData: any[] = [];

const isFolder = (item) => {
	return item.mimeType === "application/vnd.google-apps.folder";
}

const normalizeData = (arJoRawGoogleDriveData, isFirstCall) => {
	if (!arJoRawGoogleDriveData || arJoRawGoogleDriveData.length === 0) {
		return arJoRawGoogleDriveData;
	}
	const arDecoy: any[] = []
	const arNewData = arJoRawGoogleDriveData.map(joRawGoogleDriveData => {
		if (isFolder(joRawGoogleDriveData)) {
			let hasDecoy = false
			if (isFirstCall) {
				const joDecoy = genJoDecoy(joRawGoogleDriveData)
				arDecoy.push(joDecoy)
				hasDecoy = true
			}
			return {
				...joRawGoogleDriveData,
				tableData: {
					...joRawGoogleDriveData.tableData,
					isFolder: true,
					isLoaded: !isFirstCall,
					isTreeExpanded: !hasDecoy,
					isExpanded: !hasDecoy
				}
			}
		}
		return joRawGoogleDriveData;
	})

	return [...arNewData, ...arDecoy];
}

const genJoDecoy = (joRawGoogleDriveDataFolder: any): any => {
	const joTheDecoy = {
		isDecoy: true,
		parents: [joRawGoogleDriveDataFolder.id],
		name: "",
		hasThumbnail: false
	}
	return joTheDecoy
}

const removeChildrenJoDecoy = (arJoAllDataAlreadyInList: any[], idParent): any => {
	const arDataWithoutDecoy = arJoAllDataAlreadyInList.filter((joDataAlreadyInList) => {
		return !(joDataAlreadyInList.isDecoy && joDataAlreadyInList.parents && joDataAlreadyInList.parents.includes(idParent))
	})
	return arDataWithoutDecoy
}

export const GoogleDriveList = ({ joToken, onSelectionChange }) => {
	const [data, setData] = useState(initialData);
	const [isLoading, setIsLoading] = useState(true);

	const onFetchFolderData = (idParent?, isFirstCall?) => {
		setIsLoading(true);
		GoogleDrive.getFiles(joToken, idParent).then(response => {
			const arDataWithoutDecoy = removeChildrenJoDecoy(data, idParent)
			setData(arDataWithoutDecoy.concat(normalizeData(response.files, isFirstCall || false)));
			setIsLoading(false);
		});
	}

	// use effect to fetch service on apiTokens change
	useEffect(() => {
		onFetchFolderData(undefined, true);
	}, []);

	return (
		<div className="drive-list">
			<MaterialTable
				title={Translation.items}
				data={data}
				isLoading={isLoading}
				onTreeExpandChange={(item, isExpanded) => {
					if (isExpanded &&
						item.tableData &&
						item.tableData.childRows &&
						item.tableData.childRows[0] &&
						item.tableData.childRows[0].isDecoy) {
						onFetchFolderData(item.id, true);
					}
				}}
				columns={[
					{
						title: Translation.name,
						field: 'name',
						render: (item) => {
							return <GoogleDriveItem {...item} />
						}
					}
				]}
				parentChildData={(row, rows) => rows.find((joFolderRowTarget) => {
					return (joFolderRowTarget.id && row.parents && row.parents[0] && row.parents[0] === joFolderRowTarget.id)
				})}
				localization={{ ...I18n.getTableTranslation() }}
				onSelectionChange={onSelectionChange}
				options={{
					sorting: true,
					selectionProps: (item: any) => {
						const isDisabled = !(item.tableData && !item.tableData.isFolder && !item.tableData.isDecoy)
						return { disabled: isDisabled, style: { visibility: isDisabled ? "hidden" : "visible" } }
					},
					search:false,
					selection: true,
					paging: false,
					maxBodyHeight: 500,
					rowStyle: {
						height: "auto"
					}
				}}
			/>
		</div>
	)
}

const GoogleDriveItem = ({ name, iconLink }) => {
	const lkImage = iconLink;
	return <FileField nm={name} lkImage={lkImage} />
}
