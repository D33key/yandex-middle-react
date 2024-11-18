import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Subtitle from '../../ui/heading/Subtitle';
import cl from './Ingredient.module.css';
import { MockeData } from '../../../types';
import { useState } from 'react';
import ProductModal from '../../modal/product-modal/ProductModal';

interface Props {
	data: MockeData[];
	title: string;
}

export default function Ingredient({ data, title }: Props) {
	const [selectedProduct, setSelectedProduct] = useState<MockeData | null>(
		null,
	);

	const handleProductClick = (product: MockeData) => {
		setSelectedProduct(product);
	};

	const closeProductInfo = () => {
		setSelectedProduct(null);
	};

	return (
		<div className={cl.wrapper}>
			<Subtitle>{title}</Subtitle>
			<div className={cl.productsArrayWrapper}>
				{data.map((product) => (
					<div
						key={product._id}
						className={cl.productWrapper}
						onClick={() => handleProductClick(product)}
					>
						<div className={cl.img}>
							<img src={product.image} alt={product.name} />
							{product.__v > 0 && (
								<Counter count={product.__v} size='default' extraClass='m-1' />
							)}
						</div>
						<p className={`text text_type_digits-default ${cl.price}`}>
							{product.price} <CurrencyIcon type='primary' />
						</p>
						<p className='text text_type_main-default'>{product.name}</p>
					</div>
				))}
			</div>

			{selectedProduct && (
				<ProductModal product={selectedProduct} onClose={closeProductInfo} />
			)}
		</div>
	);
}
