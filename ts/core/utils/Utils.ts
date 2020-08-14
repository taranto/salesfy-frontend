export function normalizeCombo(idField, displayField, items){
	const arrItems:any[] = [];

	if(items){
		items.map(item => {
			arrItems.push({
				value: item[idField],
				label: item[displayField],
			})
		})
	}

	return arrItems;
}
