import { createPortal } from 'react-dom';
import cl from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Title, { TitleProps } from '@/atoms/heading/Title';
import { useCloseModalWhenPress } from '@/helpers/hooks/useCloseModalWhenPress';
import { useLocation, useNavigate } from 'react-router';

interface ModalProps {
	headerTitle?: string | null;
	onClose: () => void;
	children: React.ReactNode;
	headerType?: TitleProps['type'];
	shouldReplaceUrlWhenClose?: boolean;
}

type OverlayProps = Omit<ModalProps, 'headerTitle'>;

export default function Modal({
	headerTitle = null,
	headerType,
	onClose,
	children,
}: ModalProps) {
	useCloseModalWhenPress(onClose);

	return createPortal(
		<Modal.Overlay onClose={onClose}>
			<div className='flex justify-between items-center'>
				{headerTitle && (
					<Title as='h3' isWide type={headerType}>
						{headerTitle}
					</Title>
				)}
				<div
					className={`cursor-pointer ${cl.margin} ml-auto flex `}
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
	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => {
		const background = location.state?.background;
		navigate(background?.pathname || '/', { replace: true });
	};
	
	return (
		<div
			className={cl.overlay}
			onClick={() => {
				onClose();
				handleClose();
			}}
		>
			<div className={cl.content} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

Modal.Overlay = Overlay;
