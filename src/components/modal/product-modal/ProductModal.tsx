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
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Subtitle as='h3'>Детали ингредиента</Subtitle>
					<div onClick={onClose}>
						<CloseIcon type='primary' />
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
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
