import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import Subtitle from '../ui/heading/Subtitle';
import { useCloseModalWhenPress } from '../../hooks/useCloseModalWhenPress';
import cl from './Modal.module.css';
import ModalOverlay from './ModalOverlay';

interface ModalProps {
	headerTitle?: string | null;
	onClose: () => void;
	children: React.ReactNode;
}

export default function Modal({
	headerTitle = null,
	onClose,
	children,
}: ModalProps) {
	useCloseModalWhenPress(onClose);

	return createPortal(
		<ModalOverlay onClose={onClose}>
			<div className='flex justify-between items-center'>
				{headerTitle && (
					<Subtitle as='h3' isWide>
						Детали ингредиента
					</Subtitle>
				)}
				<div
					className={`cursor-pointer ml-auto flex ${cl.margin}`}
					onClick={onClose}
				>
					<CloseIcon type='primary' />
				</div>
			</div>
			{children}
		</ModalOverlay>,
		document.getElementById('modals')!,
	);
}
