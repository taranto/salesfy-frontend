import React from 'react';
import Modal from '@material-ui/core/Modal';
import { CancelCompleteButton, SaveCompleteButton, CloseButton } from '../button/Button';
import { Translation } from 'app-core/utils/translate/Translation';
import Typography from '@material-ui/core/Typography';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}
interface IModalProps {
	open: boolean,
	setOpen: any,
	description: string,
	title: string,
	onClickSuccess?: () => void,
}
export default function ConfirmModal({ open, setOpen, title, description, onClickSuccess }: IModalProps) {
	const [modalStyle] = React.useState(getModalStyle);

	const onSuccess = () => {
		if (onClickSuccess) {
			onClickSuccess();
		}
		setOpen(false);
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
			>
				<div style={modalStyle} className={`modal confirm`}>
					<div className="header">
						<Typography variant="h5">{title}</Typography>
						<CloseButton className="close-button" onClick={() => setOpen(false)} />
					</div>
					<div className="body">
						<Typography variant="subtitle1">{description}</Typography>
					</div>
					<div className="footer">
						<SaveCompleteButton placeholder={Translation.toRemove} onClick={onSuccess} />
						<CancelCompleteButton placeholder={Translation.cancel} onClick={() => setOpen(false)}/>
					</div>
				</div>
			</Modal>
		</div>
	);
}
