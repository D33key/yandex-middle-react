import { createPortal } from 'react-dom';
import cl from './OrderModal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
	onClose: () => void;
};

export default function OrderModal({ onClose }: Props) {
	return createPortal(
		<div className={cl.modalOverlay} onClick={onClose}>
			<div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<div onClick={onClose} style={{ cursor: 'pointer' }}>
						<CloseIcon type='primary' />
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '0 100px',
					}}
				>
					<p
						className={`text text_type_digits-large ${cl.digits}`}
						style={{ marginTop: '16px' }}
					>
						034536
					</p>
					<p
						className='text text_type_main-medium'
						style={{ marginTop: '32px', marginBottom: '60px' }}
					>
						идентификатор заказа
					</p>
					<img src='./src/images/done.png' alt='Заказ принят' />
					<p
						className='text text_type_main-default'
						style={{ marginTop: '60px', marginBottom: '8px' }}
					>
						Ваш заказ начали готовить
					</p>
					<p className='text text_type_main-default text_color_inactive'>
						Дождитесь готовности на орбитальной станции
					</p>
				</div>
			</div>
		</div>,
		document.body,
	);
}
