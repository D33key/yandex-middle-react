import { createPortal } from 'react-dom';
import cl from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCloseModalWhenPress } from '@/hooks/useCloseModalWhenPress';
import Title from '@/atoms/heading/Title';

interface ModalProps {
	headerTitle?: string | null;
	onClose: () => void;
	children: React.ReactNode;
}

type OverlayProps = Omit<ModalProps, 'headerTitle'>;

export default function Modal({
	headerTitle = null,
	onClose,
	children,
}: ModalProps) {
	useCloseModalWhenPress(onClose);

	return createPortal(
		<Modal.Overlay onClose={onClose}>
			<div className='flex justify-between items-center'>
				{headerTitle && (
					<Title as='h3' isWide>
						{headerTitle}
					</Title>
				)}
				<div
					className={`cursor-pointer ml-auto flex ${cl.margin}`}
					onClick={onClose}
				>
					<CloseIcon type='primary' />
				</div>
			</div>
			{children}
		</Modal.Overlay>,
		document.getElementById('modals')!,
	);
}

function Overlay({ children, onClose }: OverlayProps) {
	return (
		<div className={cl.overlay} onClick={onClose}>
			<div className={cl.content} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

Modal.Overlay = Overlay;
