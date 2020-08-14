import React from 'react';
import Modal from '@material-ui/core/Modal';
import { OutlineButton, SaveCompleteButton, CloseButton } from '../button/Button';
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
	Button?: (props) => JSX.Element
	Header?: (props) => JSX.Element
	children: JSX.Element,
	title: string,
	onClickSuccess?: () => void,
	onOpenPromise?: () => Promise<void>,
	className?: string,
	confirmButtonText?: string
}
export default function SimpleModal({ Button, Header, title, children, onClickSuccess, confirmButtonText, onOpenPromise, className }: IModalProps) {
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const onSuccess = () => {
		if (onClickSuccess) {
			onClickSuccess();
		}
		setOpen(false);
	};

	const onOpen = async () => {
		if (onOpenPromise) {
			await onOpenPromise();
		}
		setOpen(true);
	};

	return (
		<div>
			{Button ?
				<Button onClick={onOpen} setOpen={setOpen} /> :
				<OutlineButton placeholder={Translation.open} onClick={onOpen} />
			}
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				className={className}
			>
				<div style={modalStyle} className={`modal`}>
					<div className="header">
						{Header ? <Header title={title} /> : <Typography variant="h5">{title}</Typography>}
						<CloseButton className="close-button" onClick={() => setOpen(false)} />
					</div>
					<div className="body">
						{children}
					</div>
					<div className="footer">
						<SaveCompleteButton onClick={onSuccess} placeholder={confirmButtonText || ""}/>
					</div>
				</div>
			</Modal>
		</div>
	);
}
