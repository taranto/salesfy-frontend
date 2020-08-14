import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'
import { connect } from "react-redux";
import { handleNewRowUtil,  handleRowModeUtil, getNewGroupButton, getExcludeIdsUtil, getOptions, getColumns, getComponentToolbar } from './GroupListComponents';
import { I18n } from "salesfy-shared/js/EntryPoint";
import { NewButton } from '../../component/button/Button';



const GroupList = (
	{ hasAuthInItem, idUser,
		onRowAdd, onRowUpdate, groupListRows, removeGroupRow, 
		removeUserGroupRow, updateUserAuth, favoriteGroup, isLoading } ) => {
	
	let blurTime
	const idUserLogged = idUser
	const [newRow, setNewRow] = useState<any>(undefined)
	const [rowMode, setRowMode] = useState<any>({})
	const [loadingState, setLoadingState] = useState(false)

	// Init update row DATA
	let newItems = newRow ? groupListRows.concat([newRow.config]) : groupListRows;
	if(rowMode) {		
		const path = newItems[rowMode.idRow]
		path ? path.mode = rowMode.action : null
	}
	// Finish update row Data
	
	useEffect(()=> {
		setLoadingState(false)
	}, [isLoading])

	const handleNewRow = handleNewRowUtil(newItems, blurTime, setNewRow)
	const handleRowMode = handleRowModeUtil(setRowMode)
	const onBlurNewItem = () => setNewRow(undefined)
	const getExcludeIds = getExcludeIdsUtil(groupListRows)
	const newButtonAction = getNewGroupButton()

	const getComponentAction = () => {
		return (<NewButton onClick={handleNewRow} />)
	}

	return (
		<MaterialTable
			title={""}
			data={newItems}
			isLoading={loadingState ? loadingState : isLoading}
			actions={newButtonAction}
			options={getOptions()}
			localization={{ ...I18n.getTableTranslation() }}
			parentChildData={(row, rows) => rows.find(aRow => !row.isGroup && aRow.isGroup && aRow.idGroup === row.idGroup)}
			components={{
				Toolbar: (props) => getComponentToolbar(props),
				Action: () => getComponentAction()
			}}
			columns={getColumns(groupListRows, handleRowMode, removeGroupRow,
				removeUserGroupRow, onRowUpdate, hasAuthInItem, updateUserAuth, getExcludeIds,
				onBlurNewItem, onRowAdd, handleNewRow, favoriteGroup, idUserLogged, setLoadingState)}/>)
}


const mapStateToProps = state => ({
	isLoading: state.group.isLoading,
	idUser: state.user.idUser
});

export default connect(mapStateToProps)(GroupList);
