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
				<div className='flex justify-end'>
					<div className='cursor-pointer' onClick={onClose}>
						<CloseIcon type='primary' />
					</div>
				</div>
				<div className={`flex flex-col items-center ${cl.padding}`}>
					<p
						className={`text text_type_digits-large ${cl.digits} ${cl['margin-top-1']}`}
					>
						034536
					</p>
					<p
						className={`text text_type_main-medium ${cl['margin-top-2']} ${cl['margin-bottom-3']}`}
					>
						идентификатор заказа
					</p>
					<img src='./src/images/done.png' alt='Заказ принят' />
					<p
						className={`text text_type_main-default ${cl['margin-top-3']} ${cl['margin-bottom-05']}`}
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
