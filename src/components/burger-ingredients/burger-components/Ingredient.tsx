import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../../modal/Modal';
import IngredientDetails from '../../modal/ingredient-details/IngredientDetails';
import Subtitle from '../../ui/heading/Subtitle';
import { CategoriesType } from '../types';
import cl from './Ingredient.module.css';

interface Props {
	data: CategoriesType[];
	title: string;
}

export default function Ingredient({ data, title }: Props) {
	const [selectedProduct, setSelectedProduct] = useState<CategoriesType | null>(
		null,
	);

	const handleProductClick = (product: CategoriesType) => {
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
				<Modal headerTitle='Детали ингредиента' onClose={closeProductInfo}>
					<IngredientDetails product={selectedProduct} />
				</Modal>
			)}
		</div>
	);
}
