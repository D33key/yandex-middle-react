import { createPortal } from 'react-dom';
import cl from './ProductModal.module.css';
import Subtitle from '../../ui/heading/Subtitle';
import { MockeData } from '../../../types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ProductInfo from './ProductInfo';

export default function ProductModal({
	product,
	onClose,
}: {
	product: MockeData;
	onClose: () => void;
}) {
	return createPortal(
		<div className={cl.modalOverlay} onClick={onClose}>
			<div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className='flex justify-between'>
					<Subtitle as='h3'>Детали ингредиента</Subtitle>
					<div className='cursor-pointer' onClick={onClose}>
						<CloseIcon type='primary' />
					</div>
				</div>
				<div className='flex flex-col items-center'>
					<img src={product.image_large} alt={product.name} />
					<p className={`text text_type_main-medium ${cl.name}`}>
						{product.name}
					</p>
					<ProductInfo
						calories={product.calories}
						carbohydrates={product.carbohydrates}
						fat={product.fat}
						proteins={product.proteins}
					/>
				</div>
			</div>
		</div>,
		document.body,
	);
}
