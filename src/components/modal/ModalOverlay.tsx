import { useEffect } from 'react';
import cl from './ModalOverlay.module.css';

export default function ModalOverlay({
	children,
	onClose,
}: {
	children: React.ReactNode;
	onClose: () => void;
}) {
	useEffect(() => {
		const handleEscDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscDown);

		return () => {
			document.removeEventListener('keydown', handleEscDown);
		};
	}, []);
	return (
		<div className={cl.modalOverlay} onClick={onClose}>
			<div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}
