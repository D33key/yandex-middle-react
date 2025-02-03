import { useEffect } from 'react';

export function useCloseModalWhenPress(
	onClose: () => void,
	key = 'Escape'
) {
	useEffect(() => {
		const handleEscDown = (event: KeyboardEvent) => {
			if (event.key === key) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscDown);

		return () => {
			document.removeEventListener('keydown', handleEscDown);
		};
	}, []);
}
