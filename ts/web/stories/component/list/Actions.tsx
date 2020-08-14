import { Action } from "material-table";

interface IAction {
	onClick: (event, rowData) => void;
	tooltip?:string;
	disabled?:boolean;
}

export const DeleteAction = ({ onClick, tooltip, disabled = false }:IAction) : Action<any> => {
	return (
		{
			icon: 'delete_outline',
			tooltip,
			disabled,
			iconProps: {
				style: {
					color: "red"
				}
			},
			onClick
		}
	)
}

export const RemoveAction = ({ onClick, tooltip, disabled = false }:IAction) : Action<any> => {
	return (
		{
			icon: 'close',
			tooltip,
			disabled,
			iconProps: {
				style: {
					color: "red"
				}
			},
			onClick
		}
	)
}

export const EmptyAction = () : Action<any> => {
	return (
		{
			icon: '',
			disabled: true,
			iconProps: {
				style: {
					color: "transparent"
				}
			},
			onClick: () => {}
		}
	)
}
